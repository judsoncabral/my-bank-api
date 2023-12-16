import express from "express";
import winston from "winston";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const app = express();
app.use(express.json());
global.fileName = "account.json";

const { combine, printf, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-log.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile("account.json");
    logger.info("Api started");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile("account.json", JSON.stringify(initialJson)).then(() => {
      logger.info("Api started and file created!");
    }).catch(err => {logger.error(err)});
  }
});
