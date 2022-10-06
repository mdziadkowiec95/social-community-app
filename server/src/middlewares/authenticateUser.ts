import { NextFunction, Request, Response } from 'express';
import { WithAuth } from '../router/user.types';
import { LoggerService } from '../services/logger.service';
import { userService } from '../services/user.service';
import { getErrorResponse } from '../utilities/error-handling';

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    LoggerService.info('[authenticateUser middleware]');

    let token = (req.headers['x-access-token'] || req.headers['authorization']) as string; // Express headers are auto converted to lowercase

    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      const userPayload = userService.verifyToken(token);

      (req as WithAuth<Request>).user = userPayload.user;

      next();

      return;
    }

    return res.status(401).json(getErrorResponse('User is not authenticated!', 401));
  } catch (error) {
    LoggerService.error(error);

    return res.status(401).json(getErrorResponse('User is not authenticated!', 401));
  }
}

export { authenticateUser };
