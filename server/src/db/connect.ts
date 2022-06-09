import { connect } from 'mongoose';
import { Logger } from '../services/logger.service';

const config = {
  DB_URI: 'mongodb://localhost:27017/social-community-poc',
};

async function connectDB() {
  try {
    await connect(config.DB_URI);

    Logger.info('DB connected successfully!');
  } catch (error) {
    Logger.info(`DB connection failed - ${error}`);
  }
}

export { connectDB };
