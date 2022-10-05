/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export const withAuth =
  <R extends Request>(controller: (req: R, res: Response) => any) =>
  (req: Request, res: Response): Promise<Response<any, Record<string, any>>> =>
    controller(req as R, res);
