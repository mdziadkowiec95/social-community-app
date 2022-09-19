import { connectDB } from './db/connect';
import { LoggerService } from './services/logger.service';
import { createApp } from './app';

startServer();

async function startServer() {
  const app = createApp();
  const port = process.env.port || 5001;

  await connectDB();

  app.listen(port, () => {
    LoggerService.info(`Express server started on port: ${port}`);
  });
}
