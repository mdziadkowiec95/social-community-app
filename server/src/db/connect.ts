import { connect } from 'mongoose';
import { config } from '../config';
import { LoggerService } from '../services/logger.service';

async function connectDB() {
  try {
    const url = `${config.DB_URI}/${config.DB_NAME}`;

    await connect(url);

    LoggerService.info('DB connected successfully!');
  } catch (error) {
    LoggerService.info(`DB connection failed - ${error}`);
  }
}

export { connectDB };
