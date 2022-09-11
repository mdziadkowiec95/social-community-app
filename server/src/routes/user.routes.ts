import express from 'express';
import type { UserController } from '../controllers/user.controller';
import { makeValidator, UserValidators } from '../validators';

function createUserRouter(UserController: UserController, validators: UserValidators) {
  const router = express.Router();

  router.post('/register', [makeValidator(validators.NewUserInputValidator)], UserController.createNewUser);
  router.post('/login', [makeValidator(validators.SignInInputValidator)], UserController.loginUser);

  return router;
}

export { createUserRouter };
