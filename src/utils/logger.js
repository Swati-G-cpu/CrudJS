/* eslint-disable no-param-reassign */
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import os from "os";
import { existsSync, mkdirSync } from "fs";
// import * as Constants from '@constants/index';

let config = null;
if (process.env.LOG_CONFIG) {
  config = JSON.parse(process.env.LOG_CONFIG || "");
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  return "warn";
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);
const logFormat1 = winston.format.printf((info) => {
  return `[${info.timestamp}] [${info.hostname}] [${
    info.pid
  }] [${info.level.toUpperCase()}] ${info.message}`;
});

let errorFileName = "/tmp/logs/crud-%DATE%.log";
let fileName = "/tmp/logs/crud-%DATE%-error.log";

if (config) {
  if (!existsSync(config.logFolder)) {
    mkdirSync(config.logFolder);
  }
  errorFileName = `${config.logFolder}/${config.errorLogFile}`;
  fileName = `${config.logFolder}/${config.logFile}`;
}

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize()
  ),
});
const errorLogTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20M",
  maxFiles: "30d",
  handleExceptions: true,
  filename: errorFileName,
  level: "error",
});
const allLogTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20M",
  maxFiles: "14d",
  filename: fileName,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
errorLogTransport.on("rotate", (_oldFilename, _newFilename) => {
  // TODO: upload to s3 or send to logstash or something
});

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  consoleTransport,
  errorLogTransport,
  // Allow to print all the error level messages inside the error.log file
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  allLogTransport,
];

// Create the logger instance that has to be exported
// and used to log messages.
const Logger = winston.createLogger({
  level: level(),
  levels,
  defaultMeta: { service: "api-server" },
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format((info) => {
      info.hostname = os.hostname();
      info.pid = process.pid;
      return info;
    })(),
    logFormat1
  ),
  transports,
  exitOnError: false, // do not exit on handled exceptions
});
Logger.warn(`Creating Combined logs  ${fileName}`);
Logger.warn(`Creating Error logs  ${errorFileName}`);

export default Logger;
