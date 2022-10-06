import type { Response } from 'express';
import { LoggerService } from '../services/logger.service';
import { userService } from '../services/user.service';
import { UserModel } from '../models/User.model';
import { UserJWTPayload } from '../types/user.types';
import { getErrorResponse } from '../utilities/error-handling';
import type { AuthenticateUserRequest, LoginUserRequest, RegisterUserRequest } from '../router/user.types';

const userController = {
  loginUser: async (req: LoginUserRequest, res: Response) => {
    LoggerService.info(req.body);

    try {
      LoggerService.info(`Logging in new user`);

      const { email, password } = req.body;

      const existingUser = await UserModel.findOne({
        email,
      });

      if (!existingUser) {
        return res.status(404).json({
          statusCode: 404,
          message: `User with email "${email}" does not exist.`,
        });
      }

      const validCredentials = await userService.comparePasswords(password, existingUser.password);

      if (!validCredentials) {
        return res.status(400).json({
          statusCode: 400,
          message: `Provided credentials are invalid.`,
        });
      }

      const authToken = userService.createJSONWebToken<UserJWTPayload>({
        user: {
          id: existingUser._id.toString(),
        },
      });

      return res.json({
        authToken,
      });
    } catch (error) {
      LoggerService.error(error);

      return res.status(500).json(getErrorResponse(error, 500));
    }
  },

  createNewUser: async (req: RegisterUserRequest, res: Response) => {
    LoggerService.info(`Creating a new user.`);

    try {
      const { email } = req.body;

      const existingUser = await UserModel.findOne({
        email,
      });

      if (existingUser) {
        return res.status(409).json({
          status: 409,
          errors: [`Email "${email}" is already taken.`],
        });
      }

      const newUser = await userService.createNewUser(req.body);

      const authToken = userService.createJSONWebToken<UserJWTPayload>({
        user: {
          id: newUser._id.toString(),
        },
      });

      return res.status(201).json({
        ...newUser.toObject(),
        authToken,
      });
    } catch (error) {
      LoggerService.error(error);

      return res.status(500).json(getErrorResponse(error, 500));
    }
  },

  authenticateUser: async (req: AuthenticateUserRequest, res: Response) => {
    try {
      LoggerService.info(`[authenticateUser]`);

      const user = await userService.getUserById(req.user.id);

      return res.status(200).json(user);
    } catch (error) {
      LoggerService.error(error);
    }
  },
};

export type UserController = typeof userController;

type UserControllerKeys = keyof UserController;

export type UserControllerMethod = typeof userController[UserControllerKeys];

export { userController };
