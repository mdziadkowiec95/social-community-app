import { Request, Response, NextFunction } from 'express';
import { isFunction } from 'radash';
import type { Validator } from '../validators';

const makeValidator = (validator: Validator) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (validator && isFunction(validator.validate)) {
      await validator.validate(req.body);
    }

    next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: error,
    });
  }
};

export { makeValidator };
