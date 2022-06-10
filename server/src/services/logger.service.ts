import { createLogger, transports } from 'winston';

const LoggerService = createLogger({
  transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
});

export { LoggerService };
