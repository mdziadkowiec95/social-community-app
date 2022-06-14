import { ApolloServer } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { connectDB } from './db/connect';
import { User as UserModel } from './models/User.model';
import { resolvers } from './resolvers';
import { LoggerService } from './services/logger.service';
import { UserService } from './services/user.service';
import { UserJWTPayload } from './types/user.types';
import { User } from './types/__generated__/resolvers.types';
import * as validators from './validators';

runServer();

const context = async ({ req }: ExpressContext) => {
  const authToken = req.headers.authorization;
  const UserServiceInstance = new UserService(UserModel);
  let userAuth: UserJWTPayload | null = null;

  if (authToken) {
    userAuth = UserServiceInstance.verifyJSONWebToken(authToken) as UserJWTPayload;
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
    csrfPrevention: true,
    context,
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    LoggerService.info(`🚀  Server ready at ${url}`);
  });
}
