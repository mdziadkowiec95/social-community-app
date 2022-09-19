import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../../../app';
import { UserModel } from '../../../models/User.model';
import { connectTestDB, dropAllCollections, removeAllCollections } from '../../../__tests__/helpers/db';

describe('Register user route', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  beforeEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });

  it('register new user - happy path', async () => {
    const { body } = await request(createApp())
      .post('/api/user/register')
      .send({
        email: 'user1_integration_test@mailinator.pl',
        firstName: 'User 1',
        lastName: 'Integration',
        city: 'Kraków',
        country: 'Poland',
        dateOfBirth: new Date(),
        password: '12341234',
        passwordConfirmation: '12341234',
      })
      .expect(201);

    const savedUser = await UserModel.findOne({ email: 'user1_integration_test@mailinator.pl' });

    // Verify saved user in DB
    expect(savedUser).toBeTruthy();

    // Verify API response
    expect(body.firstName).toEqual('User 1');
    expect(body.lastName).toEqual('Integration');
    expect(body.city).toEqual('Kraków');
    expect(body.country).toEqual('Poland');
    expect(body.dateOfBirth).toBeTruthy();
    expect(body.authToken).toBeTruthy();
  });
});
