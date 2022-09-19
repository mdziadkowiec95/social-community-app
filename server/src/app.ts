import gravatar from 'gravatar';
import { UserModel } from './models/User.model';
import { LoggerService } from './services/logger.service';
import { userServiceFactory } from './services/user.service';
import { validators } from './validators';
import express from 'express';
import { userControllerFactory } from './controllers/user.controller';
import { createRouter } from './routes';

function createApp() {
  const app = express();

  const UserService = userServiceFactory({ UserModel, avatar: gravatar });
  const userController = userControllerFactory({
    LoggerService,
    UserModel,
    UserService,
  });
  const router = createRouter({ userController, validators });

  app.use(express.json());
  app.use('/user', router.user);

  return app;
}

export { createApp };
