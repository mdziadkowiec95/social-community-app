import mongoose from 'mongoose';
import request from 'supertest';
import gravatar from 'gravatar';
import { connectTestDB, dropAllCollections, removeAllCollections } from '../../../__tests__/helpers/db';
import { createApp } from '../../../app';

import { UserModel } from '../../../models/User.model';
import { userServiceFactory } from '../../../services/user.service';
import { config } from '../../../config';

describe('Login user route', () => {
  beforeAll(async () => {
    // eslint-disable-next-line no-console
    console.log(config.DB_URI);

    await connectTestDB();
  });

  beforeEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });

  it('login new user - happy path', async () => {
    // Prepare new user in DB
    const userService = userServiceFactory({ UserModel, avatar: gravatar });
    const newUser = await userService.createNewUser({
      email: 'login-user-integration-1@mailinator.pl',
      firstName: 'User 1',
      lastName: 'Integration',
      city: 'Kraków',
      country: 'Poland',
      dateOfBirth: new Date(),
      password: '12341234',
      passwordConfirmation: '12341234',
    });

    await newUser.save();

    // Test login
    const response = await request(createApp()).post('/user/login').send({
      email: 'login-user-integration-1@mailinator.pl',
      password: '12341234',
    });

    expect(response.status).toEqual(200);
    expect(response.body.authToken).toBeTruthy();
  });
});
