import { LoggerService } from '../services/logger.service';

const getErrors = (error: unknown): string[] => {
  if (typeof error === 'string') {
    return [error];
  }

  if (error && (error as Error).hasOwnProperty('message')) {
    return [(error as Error).message];
  }

  return ['Unknown error occured!'];
};

export const getErrorResponse = (error: unknown, status = 500) => {
  LoggerService.error(error);

  return {
    status,
    errors: getErrors(error),
  };
};
