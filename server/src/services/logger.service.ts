import { createLogger, transports, format } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${
    typeof message === 'string' ? message : JSON.stringify(message, null, 2)
  }`;
});

const LoggerService = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
});

export { LoggerService };
