import { ApolloServer } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { connectDB } from './db/connect';
import { User } from './models/User.model';
import { resolvers } from './resolvers';
import { LoggerService } from './services/logger.service';
import { UserService } from './services/user.service';
import * as validators from './validators';

runServer();

const context = ({ req }: ExpressContext) => {
  const authToken = req.headers.authorization;
  const user = authToken; // @TODO Replace for getting real user data from DB

  return {
    user,
    validators,
    services: {
      LoggerService,
      UserService: new UserService(),
    },
    models: {
      User,
    },
  };
};

export type ApolloContext = ReturnType<typeof context>;

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
