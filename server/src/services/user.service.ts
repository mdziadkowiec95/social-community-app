import { genSalt, compare, hash } from 'bcryptjs';
import gravatar from 'gravatar';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserModel } from '../models/User.model';
import { RegisterUserBody } from '../routes/user.types';
import { UserJWTPayload } from '../types/user.types';

const PRIVATE_KEY = 'dummy-key';

interface Gravatar {
  url(email: string, options?: gravatar.Options, protocol?: boolean): string;
}

interface UserServiceFactoryArguments {
  UserModel: typeof UserModel;
  avatar: Gravatar;
}

function userServiceFactory({ UserModel, avatar = gravatar }: UserServiceFactoryArguments) {
  function getAvatarURL(email: string): string {
    return avatar.url(email, { protocol: 'https', s: '100' });
  }

  /**
   * Enrypt user password
   */
  async function _encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);

    return await hash(password, salt);
  }

  return {
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
    verifyJSONWebToken(token: string): string | JwtPayload {
      return verify(token, PRIVATE_KEY);
    },

    async getAuthenticatedUser(userAuth: UserJWTPayload | null) {
      const user = await UserModel.findById(userAuth?.user?.id);

      if (!user) {
        throw new Error('User is not autenticated.');
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
}

export type UserService = ReturnType<typeof userServiceFactory>;

export { userServiceFactory };
