const cluster = require("cluster");
const { cpus } = require("os");

const server = require("./app");

const logger = require("./log");

const numCPUs = cpus().length;
const PORT = process.argv[2] || 8080;
const MODE = process.argv[3] || "FORK";

if (MODE !== "FORK") {
  if (cluster.isPrimary) {
    logger.info(`This is primary process: ${process.pid}`);

    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      logger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    server.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
    logger.info(`This is the Worker process: ${process.pid}`);
  }
} else {
  server.listen(process.env.PORT, () => {
    logger.info(`Server listening on http://localhost:${PORT}`);
  });
}
