import * as yup from 'yup';

const NewUserInputValidator = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.string().required(),
  password: yup.string().min(8),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Password confirmation does not match the password.'),
});

export { NewUserInputValidator };
