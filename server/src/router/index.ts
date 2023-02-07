import { createUserRouter } from './user.routes';
import { createSpaceRouter } from './space.routes';

const router = {
  user: createUserRouter(),
  space: createSpaceRouter(),
};

export { router };
