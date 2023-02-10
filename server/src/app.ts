import express from 'express';
import path from 'path';
import { router } from './router';
import { config } from './config';

function createApp() {
  const app = express();

  app.use(express.json());
  app.use('/api/v1/user', router.user);
  app.use('/api/v1/spaces', router.spaces);

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
