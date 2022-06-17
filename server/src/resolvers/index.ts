import { ApolloError, UserInputError } from 'apollo-server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { CommunityRole } from '../models/Community.model';
import { UserJWTPayload } from '../types/user.types';
import { Resolvers } from '../types/__generated__/resolvers.types';
import { getErrorMessage } from '../utilities/error-handling';
import { CreateCommunityInputValidator } from '../validators/community.validator';

const resolvers: Resolvers = {
  Query: {
    users: async (parent, args, { models }) => {
      const users = await models.User.find();

      return users;
    },

    communities: async (parent, args, { models, services, userAuth }) => {
      try {
        const user = await services.UserService.getAuthenticatedUser(userAuth);

        return await models.Community.find({ 'members.user': user._id });
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },
  },
  User: {},
  Community: {
    membersCount: async (parent, args, { models }) => {
      const communityId = parent._id;

      const members = await models.Community.count({
        _id: communityId,
      });

      return members;
    },
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
          avatar: avatar ?? services.UserService.getAvatarURL(email),
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

        await CreateCommunityInputValidator.validate(input);
        // Validate if community name already exist

        const { name, description } = input;

        const existingCommunity = await models.Community.findOne({ name });

        if (existingCommunity) {
          throw new UserInputError(`Community with name "${name}" already exist.`);
        }

        const community = new models.Community({
          name,
          description,
          createdBy: user._id,
          members: [
            {
              user: user._id,
              role: CommunityRole.ADMIN,
            },
          ],
        });

        await community.save();

        return community;
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },

    inviteCommunityMember: async (parent, { input }, { services, models, userAuth }, info) => {
      /**
       * TODO:
       * 1. Verify that user who invite is allowed (ADMIN user) of the community
       * 2. Update expiration of existin token if already thee is some token
       * 3. Send community info in the email
       */
      try {
        const role = input.role || CommunityRole.USER;
        const invitatiorToken = new models.CommunityInvitationToken({
          userId: input.userId,
          communityId: input.communityId,
          token: crypto.randomBytes(16).toString('hex'),
          role,
        });

        await invitatiorToken.save();

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'hrmdrum@gmail.com',
            pass: 'dbbscxeyncpobcot',
          },
        });

        const mailOptions = {
          from: 'hrmdrum@gmail.com',
          to: 'herminator@mailinator.com',
          subject: `[Social Community App] - New community invitation (community placeholder)`,
          html: `
            <h1>You have been invited to the "${input.communityId}" community</h1>
            <a href="">Click here to join!</a>
            <p>Token: ${invitatiorToken.token}</p>
          `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            services.LoggerService.error(err.message);
          } else {
            services.LoggerService.info(info.accepted);
          }
        });

        return {
          invited: true,
        };
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },

    joinCommunityWithInvitation: async (parent, { token }, { models, services }) => {
      /**
       * TODO:
       * 1. Make sure we are not duplication same member in the community
       * 2. Make sure we update the ROLE if member already exists
       *
       */

      try {
        const communityIvitation = await models.CommunityInvitationToken.findOne({ token });

        if (!communityIvitation) {
          throw new Error(`Community invitation is not longer valid. Please ask for invitation directly`);
        }

        const community = await models.Community.findById(communityIvitation.communityId);

        if (!community) {
          throw new Error(`Community you were invited to no longer exist.`);
        }

        community.members.push({
          user: communityIvitation.userId,
          role: communityIvitation.role,
        });

        await community.save();

        return {
          success: true,
        };
      } catch (error) {
        services.LoggerService.error(error);
        throw new UserInputError(getErrorMessage(error));
      }
    },
  },
};

export { resolvers };
