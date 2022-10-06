import { genSalt, compare, hash } from 'bcryptjs';
import gravatar from 'gravatar';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserModel } from '../models/User.model';
import { RegisterUserBody } from '../router/user.types';
import { UserJWTPayload } from '../types/user.types';

const PRIVATE_KEY = 'dummy-key';

function getAvatarURL(email: string): string {
  return gravatar.url(email, { protocol: 'https', s: '100' });
}

/**
 * Enrypt user password
 */
async function _encryptPassword(password: string): Promise<string> {
  const salt = await genSalt(10);

  return await hash(password, salt);
}

const userService = {
  /**
   * Compare user passowrd with enrypted passowrd from DB
   */
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  },
  /**
   * Generate JWT for given payload
   */
  createJSONWebToken<T extends JwtPayload>(payload: T): string {
    return sign(payload, PRIVATE_KEY, {
      expiresIn: 12 * 3600,
    });
  },
  /**
   * Verify if provided JWT is vaild
   */
  verifyToken(token: string) {
    return verify(token, PRIVATE_KEY) as UserJWTPayload;
  },

  async getUserById(id: string) {
    const user = await UserModel.findById(id).select('-password');

    if (!user) {
      throw new Error('User does not exist.');
    }

    return user;
  },

  async createNewUser(user: RegisterUserBody) {
    const { firstName, lastName, email, password, dateOfBirth, city, country, avatar } = user;
    const encryptedPassword = await _encryptPassword(password);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      dateOfBirth,
      avatar: avatar ?? getAvatarURL(email),
      city,
      country,
      password: encryptedPassword,
    });

    await newUser.save();

    return newUser;
  },
};

export { userService };
