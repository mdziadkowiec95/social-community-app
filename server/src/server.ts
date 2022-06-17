import { ApolloServer } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express';
import { readFileSync } from 'fs';
import gravatar from 'gravatar';
import { connectDB } from './db/connect';
import { Community as CommunityModel } from './models/Community.model';
import { CommunityInvitationToken as CommunityInvitationTokenModel } from './models/CommunityInvitationToken.model';
import { User as UserModel } from './models/User.model';
import { resolvers } from './resolvers';
import { LoggerService } from './services/logger.service';
import { UserService } from './services/user.service';
import { UserJWTPayload } from './types/user.types';
import * as validators from './validators';
import express from 'express';

runServer();

const context = async ({ req }: ExpressContext) => {
  const authToken = req.headers.authorization;
  const UserServiceInstance = new UserService(UserModel, gravatar);
  let userAuth: UserJWTPayload | null = null;

  try {
    if (authToken) {
      userAuth = UserServiceInstance.verifyJSONWebToken(authToken) as UserJWTPayload;
    }
  } catch (error) {
    LoggerService.info(`JWT expired | Token: ${authToken}`);
  }

  return {
    userAuth,
    validators,
    services: {
      LoggerService,
      UserService: UserServiceInstance,
    },
    models: {
      User: UserModel,
      Community: CommunityModel,
      CommunityInvitationToken: CommunityInvitationTokenModel,
    },
  };
};

export type ApolloContext = Awaited<ReturnType<typeof context>>;

async function runServer() {
  await connectDB();

  const typeDefs = readFileSync('./src/schema/schema.graphql', 'utf8');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // csrfPrevention: {},
    context,
  });

  server.listen().then((details) => {
    LoggerService.info(`🚀  Server ready at ${details.url} ${details.server}`);
  });
}
