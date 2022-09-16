import gravatar from 'gravatar';
import { connectDB } from './db/connect';
import { UserModel } from './models/User.model';
import { LoggerService } from './services/logger.service';
import { userServiceFactory } from './services/user.service';
import { validators } from './validators';
import express from 'express';
import { userControllerFactory } from './controllers/user.controller';
import { createRouter } from './routes';

startServer();

async function startServer() {
  const app = express();

  const port = process.env.port || 5001;
  const UserService = userServiceFactory({ UserModel, avatar: gravatar });
  const userController = userControllerFactory({
    LoggerService,
    UserModel,
    UserService,
  });
  const router = createRouter({ userController, validators });

  await connectDB();

  app.listen(port, () => {
    LoggerService.info(`Express server started on port: ${port}`);
  });

  app.use(express.json());
  app.use('/user', router.user);
}
