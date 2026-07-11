const cluster = require("cluster");
const process = require("process");
const os = require("os");
const express = require("express");
const app = express();


const cpus = os.cpus().length;


if(cluster.isPrimary) {
  console.log(`🚀 Primary PID: ${process.pid}`);
  console.log(`This machine has ${cpus} CPU cores\n`);
  for(let i = 0; i < cpus; i++) {
    cluster.fork();
  }
}
else{
    app.get("/", (req, res) => {
    res.send(`Hello from worker PID: ${process.pid}`);
  });
    app.listen(3000, () => {
    console.log(`Worker PID: ${process.pid} started, listening on port 3000`);
  });
}
  