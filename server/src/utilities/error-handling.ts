import { LoggerService } from '../services/logger.service';

export const getErrorResponse = (error: unknown, status = 500) => {
  const e = error as Error;

  LoggerService.error(error);

  return {
    status,
    errors: [e.message],
  };
};
