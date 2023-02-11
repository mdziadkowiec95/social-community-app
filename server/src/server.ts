import { connectDB } from './db/connect';
import { LoggerService } from './services/logger.service';
import { createApp } from './app';
import { initDocs } from './docs';

startServer();

async function startServer() {
  const app = createApp();
  const port = process.env.PORT || 5001;

  await connectDB();

  initDocs(app);

  app.listen(port, () => {
    LoggerService.info(`Express server started on port: ${port}`);
  });
}
