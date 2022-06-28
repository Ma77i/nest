const winston = require("winston");

const { combine, printf, timestamp, colorize } = winston.format;

const myFormat = printf(
  (info) => `
    ${info.timestamp} 
    ${info.level}: 
    ${info.message}`
);

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      level: "verbose",
      format: combine(colorize(), timestamp(), myFormat),
    }),
    new winston.transports.File({
      filename: "./log/logs/winston.app.log",
      level: "warn",
      format: combine(timestamp(), myFormat),
    }),
  ],
});

module.exports = logger;
