import { connect } from 'mongoose';
import { LoggerService } from '../services/logger.service';

const config = {
  DB_URI: 'mongodb://localhost:27017/social-community-poc',
};

async function connectDB() {
  try {
    await connect(config.DB_URI);

    LoggerService.info('DB connected successfully!');
  } catch (error) {
    LoggerService.info(`DB connection failed - ${error}`);
  }
}

export { connectDB };
