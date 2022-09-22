import { Request } from 'express';

type LoginUserBody = {
  email: string;
  password: string;
};

type LoginUserResponse = {
  authToken: string;
};

export type RegisterUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  dateOfBirth: Date;
  avatar?: string;
  country: string;
  city?: string;
};

type Empty = Record<string, never>;

export type LoginUserRequest = Request<Empty, LoginUserResponse, LoginUserBody, Empty>;
export type RegisterUserRequest = Request<Empty, LoginUserResponse, RegisterUserBody, Empty>;
