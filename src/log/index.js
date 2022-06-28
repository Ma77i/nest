// winston
const logger = require("./winston");

module.exports = {
  log: (msg) => logger.info(msg),
  warn: (msg) => logger.warn(msg),
  error: (msg) => logger.error(msg),
  info: (msg) => logger.info(msg)
};
