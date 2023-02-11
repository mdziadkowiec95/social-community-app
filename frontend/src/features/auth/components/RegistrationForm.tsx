import React from 'react';
import { Button, Checkbox, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const RegistrationForm = () => {
  return (
    <form>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type='email' placeholder='Email' aria-label='Email' />
        {/* <FormHelperText>{'Well never share your email.'}</FormHelperText> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type='password' placeholder='Password' aria-label='Password' />
        {/* <FormHelperText>{'Well never share your email.'}</FormHelperText> */}
      </FormControl>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input type='text' placeholder='First Name' aria-label='First Name' />
        {/* <FormHelperText>{'Well never share your email.'}</FormHelperText> */}
      </FormControl>
      <FormControl>
        <FormLabel>Last name</FormLabel>
        <Input type='text' placeholder='Last Name' aria-label='Last Name' />
        {/* <FormHelperText>{'Well never share your email.'}</FormHelperText> */}
      </FormControl>
      <Checkbox defaultChecked>I agree to terms and conditions</Checkbox>
      <Button colorScheme='blue' type='submit' data-testid='sign-in-form-submit-button'>
        Sign up
      </Button>
    </form>
  );
};
