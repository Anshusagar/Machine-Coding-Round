// main.js
const { Worker } = require("worker_threads");
const os = require("os");
const path = require("path");
function timestamp() {
  return new Date().toLocaleTimeString();
}

const jobs = [
  {
    name: "TestFileDownload",
    url: "https://ash-speed.hetzner.com/100MB.bin",
    type: "binary",
  },
  {
    name: "Pride and Prejudice",
    url: "https://www.gutenberg.org/files/1342/1342-0.txt",
    type: "text",
  },
];

console.log(`🚀 Starting ${jobs.length} tasks using up to ${os.cpus().length} cores...\n`);

const progress = {};
const start = Date.now();

const workers = jobs.map((job, idx) => {
  return new Promise((resolve, reject) => {
    console.log(`[${timestamp()}] Spawning worker ${idx + 1}: ${job.name}`);
    const worker = new Worker(path.resolve("./worker.js"), {
      workerData: { ...job, id: idx },
    });

    worker.on("message", (msg) => {
      if (msg.type === "progress") {
        progress[msg.id] = msg;
        printProgress();
      } else if (msg.type === "process-progress") {
        console.log(`[${timestamp()}] ${job.name} processed ${msg.lines} lines...`);
        process.stdout.write(`Processed ${msg.lines} lines ...\n`);
      } else if (msg.type === "done") {
        console.log(`\n[${timestamp()}] ✅ ${job.name} completed`);
        console.table(msg.result);
        resolve();
      }
    });

    worker.on("error", reject);
  });
});

Promise.all(workers).then(() => {
  const total = ((Date.now() - start) / 1000).toFixed(2);
  console.log(`\n✨ All tasks completed in ${total}s`);
});

function printProgress() {
  const bars = jobs
    .map((job, i) => {
      const p = progress[i];
      if (!p) return `${job.name}: waiting...`;
      const percent = p.percent ? `${p.percent}%` : "??%";
      const bytes = `${(p.received / (1024 * 1024)).toFixed(2)}MB`;
      const total = p.total ? `${(p.total / (1024 * 1024)).toFixed(2)}MB` : "?";
      const speed = `${p.speed}MB/s`;
      return `${job.name.padEnd(20)}: ${percent.padStart(6)} (${bytes}/${total}) ${speed}`;
    })
    .join(" | ");
  process.stdout.write(`\r${bars}`);
}
