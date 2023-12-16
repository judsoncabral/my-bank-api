import express from 'express';
import winston from "winston";
import accountsRouter from "./routes/accounts.js";

const app = express();
app.use(express.json());


const { combine, printf, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-log.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});

app.use("/account", accountsRouter);

app.listen(3000, () => {
  logger.info("Api started");
});