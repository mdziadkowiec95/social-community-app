import { userRouter } from './v1/user.routes';
import { spacesRouter } from './v1/space.routes';

const router = {
  user: userRouter,
  spaces: spacesRouter,
};

export { router };
