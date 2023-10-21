import express from "express";
import winston from "winston";
import cors from "cors";
import usersRouter from "./routes/user.route.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "auth-api.log" }),
  ],
  format: combine(label({ label: "auth-api" }), timestamp(), myFormat),
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/user", usersRouter);
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(port, () => console.log("API STARTED"));
