import mongoose from 'mongoose';
import { config } from '../../config';

async function connectTestDB() {
  try {
    // eslint-disable-next-line no-console
    console.log('config.INGEGRATION_TEST_DB_URI', config.INGEGRATION_TEST_DB_URI);

    await mongoose.connect(config.INGEGRATION_TEST_DB_URI);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];

    try {
      await collection.drop();
    } catch (error) {
      const e = error as Error;

      // Sometimes this error happens, but you can safely ignore it
      if (e.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (e.message.includes('a background operation is currently running')) return;
    }
  }
}

export { connectTestDB, removeAllCollections, dropAllCollections };
