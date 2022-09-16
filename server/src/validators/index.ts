import { SignInInputValidator } from './auth.validator';
import { NewUserInputValidator } from './user.validator';

const validators = {
  user: {
    SignInInputValidator,
    NewUserInputValidator,
  },
};

export type Validators = typeof validators;
export type Validator = typeof SignInInputValidator | typeof NewUserInputValidator;
export type UserValidators = typeof validators.user;

export { validators };
export { makeValidator } from './helpers';
