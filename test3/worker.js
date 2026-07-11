const https = require("https");
const fs = require("fs");
const crypto = require("crypto");
const readline = require("readline");

const job = JSON.parse(process.env.JOB_DATA);
const id = parseInt(process.env.JOB_INDEX, 10);

// Utility to safely send IPC messages
function safeSend(msg) {
  if (process.connected) {
    try {
      process.send(msg);
    } catch (_) {
      // ignore closed IPC errors
      console.log("⚠️ IPC channel closed, cannot send message");
    }
  }
}

// Stream-based downloader with retries, timeout, and proper stream closure
async function downloadStream(url, dest, id, retries = 3) {
  return new Promise((resolve, reject) => {
    const attemptDownload = (attempt) => {
      const req = https.get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        const total = parseInt(res.headers["content-length"], 10) || 0;
        let received = 0;
        const hash = crypto.createHash("sha256");
        const fileStream = fs.createWriteStream(dest);
        const start = Date.now();

        const sendProgress = () => {
          const elapsed = (Date.now() - start) / 1000;
          const speed = (received / (1024 * 1024)) / (elapsed || 1);
          const percent = total ? ((received / total) * 100).toFixed(2) : null;
          safeSend({
            type: "progress",
            id,
            percent,
            received,
            total,
            speed: speed.toFixed(2),
          });
        };

        res.on("data", (chunk) => {
          received += chunk.length;
          hash.update(chunk);
          sendProgress();
        });

        res.on("aborted", () => {
          if (attempt < retries) {
            console.log(`🔁 [Worker ${id}] Retry after aborted (${attempt + 1}/${retries})`);
            setTimeout(() => attemptDownload(attempt + 1), 1500);
          } else {
            reject(new Error("Download aborted repeatedly"));
          }
        });

        res.on("error", (err) => {
          if (attempt < retries) {
            console.log(`🔁 [Worker ${id}] Retry after error (${attempt + 1}/${retries})`);
            setTimeout(() => attemptDownload(attempt + 1), 1500);
          } else {
            reject(err);
          }
        });

        // ✅ Wait for both 'finish' and 'close' to ensure complete flush
        fileStream.on("finish", () => {
          fileStream.close(() => {
            const sha = hash.digest("hex");
            fs.closeSync(fs.openSync(dest, "r")); // Force file flush
            resolve({ size: received, sha, time: (Date.now() - start) / 1000 });
          });
        });

        fileStream.on("error", reject);

        res.pipe(fileStream);
      });

      req.setTimeout(60000, () => {
        req.destroy(new Error("Request timed out"));
      });

      req.on("error", (err) => {
        if (attempt < retries) {
          console.log(`🔁 [Worker ${id}] Network retry (${attempt + 1}/${retries})`);
          setTimeout(() => attemptDownload(attempt + 1), 1500);
        } else {
          reject(err);
        }
      });
    };

    attemptDownload(0);
  });
}

// Stream text file line-by-line efficiently
async function processTextFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });
  let lines = 0,
    words = 0,
    chars = 0;

  for await (const line of rl) {
    lines++;
    words += line.split(/\s+/).filter(Boolean).length;
    chars += line.length;

    if (lines % 1000 === 0) {
      safeSend({ type: "process-progress", id, lines });
    }
  }

  return { lines, words, chars };
}

// Worker logic
(async () => {
  const dest = `./${job.name}.tmp`;

  try {
    const download = await downloadStream(job.url, dest, id);
    let result = {
      file: dest,
      sizeMB: (download.size / (1024 * 1024)).toFixed(2),
      sha256: download.sha,
      time: `${download.time.toFixed(2)}s`,
    };

    if (job.type === "text") {
      const stats = await processTextFile(dest);
      result = { ...result, ...stats };
    }

    safeSend({ type: "done", id, result });
  } catch (err) {
    safeSend({ type: "error", id, error: err.message });
  }
})();

// Graceful exit when master says "exit"
process.on("message", (msg) => {
  if (msg === "exit") setTimeout(() => process.exit(0), 200);
});
