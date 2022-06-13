import * as yup from 'yup';

const SignInInputValidator = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export { SignInInputValidator };
