import { createLogger, transports } from 'winston';

const Logger = createLogger({
  transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
});

export { Logger };
