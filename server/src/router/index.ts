import { createUserRouter } from './user.routes';

const router = {
  user: createUserRouter(),
};

export { router };
