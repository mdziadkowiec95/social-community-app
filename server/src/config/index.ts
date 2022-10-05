import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_URI: process.env.DB_URI ?? 'mongodb://localhost:27017',
  INGEGRATION_TEST_DB_URI: process.env.INGEGRATION_TEST_DB_URI ?? 'mongodb://localhost:27017/integration-test-db',
  isProduction: () => process.env.NODE_ENV === 'production',
};

export { config };
