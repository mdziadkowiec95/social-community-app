import type { UserController } from '../controllers/user.controller';
import { createUserRouter } from './user.routes';
import type { Validators } from '../validators';

function createRouter({ userController, validators }: { userController: UserController; validators: Validators }) {
  return {
    user: createUserRouter(userController, validators.user),
  };
}

export { createRouter };
