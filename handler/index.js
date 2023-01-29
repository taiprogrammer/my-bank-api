import winston from "winston";

const { printf, combine, label, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "errors.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});