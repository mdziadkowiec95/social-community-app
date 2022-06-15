import { ApolloError, UserInputError } from 'apollo-server';
import { UserJWTPayload } from '../types/user.types';
import { Resolvers } from '../types/__generated__/resolvers.types';
import { getErrorMessage } from '../utilities/error-handling';

const resolvers: Resolvers = {
  Query: {
    users: async (parent, args, { models }) => {
      const users = await models.User.find();

      return users;
    },

    communities: async () => {
      return [];
    },
  },
  User: {
    communities: () => [],
  },
  Mutation: {
    newUser: async (parent, { input }, { services, models, validators }, info) => {
      services.LoggerService.info(`${info.fieldName} ${info.operation.operation} ${JSON.stringify(input)}`);

      try {
        const existingUser = await models.User.findOne({
          email: input.email,
        });

        if (existingUser) {
          throw new ApolloError(`Email "${input.email}" is already taken.`);
        }

        await validators.NewUserInputValidator.validate(input);

        const { firstName, lastName, email, password, dateOfBirth, avatar, city, country } = input;

        const encryptedPassword = await services.UserService.encryptPassword(password);

        const newUser = new models.User({
          firstName,
          lastName,
          email,
          dateOfBirth,
          avatar,
          city,
          country,
          password: encryptedPassword,
        });

        const authToken = services.UserService.createJSONWebToken<UserJWTPayload>({
          user: {
            id: newUser._id,
          },
        });

        await newUser.save();

        return {
          ...newUser.toObject(),
          authToken,
        };
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },

    signIn: async (parent, { input }, { services, models, validators }, info) => {
      try {
        services.LoggerService.info(`${info.fieldName} ${info.operation.operation} ${JSON.stringify(input)}`);

        await validators.SignInInputValidator.validate(input);

        const { email, password } = input;

        const existingUser = await models.User.findOne({
          email,
        });

        if (!existingUser) {
          throw new UserInputError(`User with email "${email}" does not exist.`);
        }

        const validCredentials = await services.UserService.comparePasswords(password, existingUser.password);

        if (!validCredentials) {
          throw new UserInputError(`Provided credentials are invalid.`);
        }

        const authToken = services.UserService.createJSONWebToken<UserJWTPayload>({
          user: {
            id: existingUser._id,
          },
        });

        return {
          authToken,
        };
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },

    authenticateUser: async (parent, args, { services, userAuth }, info) => {
      try {
        services.LoggerService.info(`${info.fieldName} ${info.operation.operation} ${JSON.stringify(userAuth)}`);

        const user = await services.UserService.getAuthenticatedUser(userAuth);

        return user;
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },

    createCommunity: async (parent, { input }, { services, models, userAuth }) => {
      try {
        const user = await services.UserService.getAuthenticatedUser(userAuth);
        // Validate INPUT
        // Validate if community name already exist
        const { name, description } = input;

        const community = new models.Community({
          name,
          description,
          createdBy: user._id,
        });

        await community.save();

        return community;
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },
  },
};

export { resolvers };
