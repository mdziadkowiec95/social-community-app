import { ApolloError, UserInputError } from 'apollo-server';
import { LoggerService } from '../services/logger.service';
import { Resolvers } from '../types/__generated__/resolvers.types';
import { NewUserInputValidator } from '../validators/user.validator';

const getError = (error: any) => {
  if (error && error.errors) {
    return error.errors.join(', ');
  }

  return error.message;
};

const resolvers: Resolvers = {
  Query: {
    users: async (parent, args, { services, models }) => {
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
    newUser: async (parent, { input }, { services, models }, info) => {
      LoggerService.info(`${info.fieldName} ${info.operation.operation} ${JSON.stringify(input)}`);

      try {
        const existingUser = await models.User.findOne({
          email: input.email,
        });

        if (existingUser) {
          throw new ApolloError(`Email "${input.email}" is already taken.`);
        }

        await NewUserInputValidator.validate(input);

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

        const authToken = services.UserService.createJSONWebToken({
          user: {
            id: newUser._id,
          },
        });

        await newUser.save();

        newUser.toObject();

        return {
          ...newUser.toObject(),
          authToken,
        };
      } catch (error) {
        LoggerService.error(error);
        throw new UserInputError(getError(error));
      }
    },
  },
};

export { resolvers };
