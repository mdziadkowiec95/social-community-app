import type { Response } from 'express';
import { LoggerService } from '../services/logger.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/User.model';
import { UserJWTPayload } from '../types/user.types';
import { getErrorResponse } from '../utilities/error-handling';
import type { LoginUserRequest, RegisterUserRequest } from '../routes/user.types';

interface UserControllerArguments {
  LoggerService: typeof LoggerService;
  UserModel: typeof UserModel;
  UserService: UserService;
}

const userControllerFactory = ({ LoggerService, UserModel, UserService }: UserControllerArguments) => ({
  async loginUser(req: LoginUserRequest, res: Response) {
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

      const validCredentials = await UserService.comparePasswords(password, existingUser.password);

      if (!validCredentials) {
        return res.status(400).json({
          statusCode: 400,
          message: `Provided credentials are invalid.`,
        });
      }

      const authToken = UserService.createJSONWebToken<UserJWTPayload>({
        user: {
          id: existingUser._id,
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

  async createNewUser(req: RegisterUserRequest, res: Response) {
    LoggerService.info(`Creating a new user.`);

    try {
      const { firstName, lastName, email, password, dateOfBirth, avatar, city, country } = req.body;

      const existingUser = await UserModel.findOne({
        email,
      });

      if (existingUser) {
        return res.status(409).json({
          status: 409,
          errors: [`Email "${email}" is already taken.`],
        });
      }

      const encryptedPassword = await UserService.encryptPassword(password);

      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        dateOfBirth,
        avatar: avatar ?? UserService.getAvatarURL(email),
        city,
        country,
        password: encryptedPassword,
      });

      const authToken = UserService.createJSONWebToken<UserJWTPayload>({
        user: {
          id: newUser._id,
        },
      });

      await newUser.save();

      return res.status(201).json({
        ...newUser.toObject(),
        authToken,
      });
    } catch (error) {
      LoggerService.error(error);

      return res.status(500).json(getErrorResponse(error, 500));
    }
  },
});

export type UserController = ReturnType<typeof userControllerFactory>;

export { userControllerFactory };
