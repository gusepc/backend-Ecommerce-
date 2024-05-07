import winston from "winston";
import config from "../config/config.js";

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "cyan",
    warning: "magenta",
    info: "green",
    http: "blue",
    debug: "black",
  },
};

const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(winston.format.colorize({ colors: customLevelOptions.colors }), winston.format.simple()),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(winston.format.colorize({ colors: customLevelOptions.colors }), winston.format.simple()),
    }),
    new winston.transports.File({
      level: "error",
      filename: "./src/errors/errors.log",
    }),
  ],
});

winston.addColors(customLevelOptions.colors);

export const addLogger = (req, res, next) => {
  const environment = config.env || "development";
  const logger = environment === "development" ? devLogger : prodLogger;

  Object.keys(customLevelOptions.levels).forEach((level) => {
    logger[level] = (message) => logger.log({ level, message });
  });
  const date = new Date();
  const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  req.logger = logger;
  logger.http(`${req.method} ${req.url} ${formattedDateTime}`);
  next();
};
