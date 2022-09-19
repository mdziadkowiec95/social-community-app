import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
};

export { config };
