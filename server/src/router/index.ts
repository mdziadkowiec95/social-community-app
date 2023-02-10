import { userRouter } from './user.routes';
import { spacesRouter } from './space.routes';

const router = {
  user: userRouter,
  spaces: spacesRouter,
};

export { router };
