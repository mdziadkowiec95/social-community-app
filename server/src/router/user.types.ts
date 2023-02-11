import type { Request } from 'express';
import { WithAuth } from '../types/user.types';

type LoginUserBody = {
  email: string;
  password: string;
};

type LoginUserResponse = {
  authToken: string;
};

type AuthenticateUserResponse = LoginUserResponse;

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
export type AuthenticateUserRequest = WithAuth<Request<Empty, AuthenticateUserResponse, Empty, Empty>>;

export type UserRequests = LoginUserRequest | RegisterUserRequest | AuthenticateUserRequest;
