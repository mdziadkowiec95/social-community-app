import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useLoginUserMutation } from '../store/authApi';

type LoginFormFields = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginFormFields>();
  const [loginUser] = useLoginUserMutation();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await loginUser({
      email,
      password,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          placeholder='Email'
          aria-label='Email'
          data-testid='login-form-email-field'
          {...register('email')}
        />
        {/* <FormHelperText>{'Well never share your email.'}</FormHelperText> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          placeholder='Password'
          aria-label='Password'
          data-testid='login-form-password-field'
          {...register('password')}
        />
        {/* <FormHelperText>{'Well never share your email.'}</FormHelperText> */}
      </FormControl>
      <Button colorScheme='blue' type='submit' data-testid='login-form-submit-button'>
        Log in
      </Button>
    </form>
  );
};
