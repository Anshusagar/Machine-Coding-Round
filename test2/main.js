const cluster = require("cluster");
const os = require("os");
const path = require("path");

const jobs = [
  {
    name: "TestFileDownload",
    url: "https://ash-speed.hetzner.com/100MB.bin",
    type: "binary",
  },
  {
    name: "BookProcessing",
    url: "https://www.gutenberg.org/files/1342/1342-0.txt",
    type: "text",
  },
];

const progress = {};

if (cluster.isPrimary) {
  console.log(`🚀 Primary process PID: ${process.pid}`);
  console.log(`Starting ${jobs.length} tasks on ${os.cpus().length} cores...\n`);

  const start = Date.now();

  jobs.forEach((job, idx) => {
    const worker = cluster.fork({
      JOB_INDEX: idx,
      JOB_DATA: JSON.stringify(job),
    });

    worker.on("message", (msg) => {
      if (msg.type === "progress") {
        progress[msg.id] = msg;
        printProgress();
      } else if (msg.type === "done") {
        console.log(`\n✅ ${job.name} completed`);
        console.table(msg.result);
      }
    });

    worker.on("exit", (code) => {
      if (code !== 0) console.log(`❌ Worker ${idx} exited with code ${code}`);
      if (Object.keys(progress).length === jobs.length) {
        const time = ((Date.now() - start) / 1000).toFixed(2);
        console.log(`\n✨ All tasks completed in ${time}s`);
        cluster.disconnect();
      }
    });
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
} else {
  // Worker process — runs worker.js logic
  require(path.resolve("./worker.js"));
}
