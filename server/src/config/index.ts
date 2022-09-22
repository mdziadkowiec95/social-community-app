import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_URI: process.env.DB_URI,
  INGEGRATION_TEST_DB_URI: process.env.INGEGRATION_TEST_DB_URI ?? '',
  isProduction: () => process.env.NODE_ENV === 'production',
};

export { config };
