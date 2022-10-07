import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, Form } from 'semantic-ui-react';

type InputFormFields = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<InputFormFields>();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const response = await axios({
      url: '/api/user/login',
      method: 'post',
      data: {
        email,
        password,
      },
    });

    if (response.data.authToken) {
      console.log('response.data.authToken', response.data.authToken);

      navigate('/app');
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <input
          type='email'
          placeholder='Email'
          aria-label='Email'
          data-testid='login-form-email-field'
          {...register('email')}
        />
      </Form.Field>
      <Form.Field>
        <input
          type='password'
          placeholder='Password'
          aria-label='Password'
          data-testid='login-form-password-field'
          {...register('password')}
        />
      </Form.Field>
      <Button type='submit' primary data-testid='login-form-submit-button'>
        Log in
      </Button>
    </Form>
  );
};
