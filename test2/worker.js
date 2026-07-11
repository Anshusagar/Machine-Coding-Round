const https = require("https");
const fs = require("fs");
const crypto = require("crypto");
const readline = require("readline");

// Worker data passed via environment variables
const job = JSON.parse(process.env.JOB_DATA);
const id = parseInt(process.env.JOB_INDEX, 10);

async function downloadStream(url, dest, id) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request failed: ${res.statusCode}`));
        return;
      }

      const total = parseInt(res.headers["content-length"], 10) || 0;
      let received = 0;
      const hash = crypto.createHash("sha256");
      const fileStream = fs.createWriteStream(dest);
      const start = Date.now();

      res.on("data", (chunk) => {
        received += chunk.length;
        hash.update(chunk);

        const elapsed = (Date.now() - start) / 1000;
        const speed = (received / (1024 * 1024)) / (elapsed || 1);
        const percent = total ? ((received / total) * 100).toFixed(2) : null;

        process.send({
          type: "progress",
          id,
          percent,
          received,
          total,
          speed: speed.toFixed(2),
        });
      });

      res.pipe(fileStream);

      fileStream.on("finish", () => {
        const sha = hash.digest("hex");
        resolve({ size: received, sha, time: (Date.now() - start) / 1000 });
      });

      res.on("error", reject);
    });
  });
}

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
      process.send({ type: "process-progress", id, lines });
    }
  }

  return { lines, words, chars };
}

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

    process.send({ type: "done", id, result });
    process.exit(0);
  } catch (err) {
    process.send({ type: "error", id, error: err.message });
    process.exit(1);
  }
})();
