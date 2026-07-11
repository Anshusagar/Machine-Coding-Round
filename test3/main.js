const cluster = require("cluster");
const os = require("os");
const path = require("path");

const jobs = [
  {
    name: "TestFileDownload",
    url: "https://ash-speed.hetzner.com/100MB.bin", // or https://ash-speed.hetzner.com/10MB.bin for faster tests
    type: "binary",
  },
  {
    name: "BookProcessing",
    url: "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt",
    type: "text",
  },
];

const progress = {};

if (cluster.isPrimary) {
  console.log(`🚀 Primary PID: ${process.pid}`);
  console.log(`Launching ${jobs.length} cluster workers...\n`);

  const start = Date.now();
  let finished = 0;

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
        finished++;
        worker.send("exit");
        checkCompletion();
      } else if (msg.type === "error") {
        console.error(`❌ Worker ${idx} (${job.name}) failed: ${msg.error}`);
        finished++;
        worker.send("exit");
        checkCompletion();
      }
    });

    worker.on("exit", (code) => {
      if (code !== 0) console.log(`⚠️ Worker ${idx} exited with code ${code}`);
    });
  });

  function checkCompletion() {
    if (finished === jobs.length) {
      const total = ((Date.now() - start) / 1000).toFixed(2);
      console.log(`\n✨ All tasks completed in ${total}s`);
      setTimeout(() => cluster.disconnect(), 300);
    }
  }

  function printProgress() {
    const bars = jobs
      .map((job, i) => {
        const p = progress[i];
        if (!p) return `${job.name}: waiting...`;
        const percent = p.percent ? `${p.percent}%` : "??%";
        const bytes = `${(p.received / (1024 * 1024)).toFixed(2)}MB`;
        const total = p.total
          ? `${(p.total / (1024 * 1024)).toFixed(2)}MB`
          : "?";
        const speed = `${p.speed}MB/s`;
        return `${job.name.padEnd(20)}: ${percent.padStart(6)} (${bytes}/${total}) ${speed}`;
      })
      .join(" | ");
    process.stdout.write(`\r${bars}`);
  }
} else {
  require(path.resolve("./worker.js"));
}
