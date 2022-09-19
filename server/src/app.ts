import express from 'express';
import path from 'path';
import gravatar from 'gravatar';
import { UserModel } from './models/User.model';
import { LoggerService } from './services/logger.service';
import { userServiceFactory } from './services/user.service';
import { validators } from './validators';
import { userControllerFactory } from './controllers/user.controller';
import { createRouter } from './routes';
import { config } from './config';

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
  app.use('/api/user', router.user);

  if (config.isProduction()) {
    const frontendBuildPath = path.resolve(__dirname, path.join('../../', 'frontend', 'build'));

    app.use(express.static(frontendBuildPath));

    app.get('*', (req, res) => {
      const indexHTMLPath = path.resolve(__dirname, path.join('../../', 'frontend', 'build', 'index.html'));

      res.sendFile(indexHTMLPath);
    });
  }

  return app;
}

export { createApp };
