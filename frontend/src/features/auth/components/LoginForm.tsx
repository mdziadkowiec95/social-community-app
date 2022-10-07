import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export const LoginForm = () => {
  return (
    <Form>
      <Form.Field>
        <input
          type='email'
          name='email'
          placeholder='Email'
          aria-label='Email'
          data-testid='login-form-email-field'
        />
      </Form.Field>
      <Form.Field>
        <input
          type='password'
          name='password'
          placeholder='Password'
          aria-label='Password'
          data-testid='login-form-password-field'
        />
      </Form.Field>
      <Button primary data-testid='login-form-submit-button'>
        Log in
      </Button>
    </Form>
  );
};
