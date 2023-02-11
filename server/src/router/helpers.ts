/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserJWTPayload } from '../types/user.types';

export const withAuth =
  <R extends Request>(controller: (req: R & UserJWTPayload, res: Response) => any) =>
  (req: Request, res: Response): Promise<Response<any, Record<string, any>>> =>
    controller(req as R & { user: { id: string } }, res);
