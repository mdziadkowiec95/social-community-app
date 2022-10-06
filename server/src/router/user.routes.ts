/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import { userController } from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/authenticateUser';
import { makeValidator, validators } from '../validators';
import { withAuth } from './helpers';
import { AuthenticateUserRequest } from './user.types';

function createUserRouter() {
  const router = express.Router();

  router.post('/register', [makeValidator(validators.user.NewUserInputValidator)], userController.createNewUser);
  router.post('/login', [makeValidator(validators.user.SignInInputValidator)], userController.loginUser);
  router.get('/auth', [authenticateUser], withAuth<AuthenticateUserRequest>(userController.authenticateUser));

  return router;
}

export { createUserRouter };
