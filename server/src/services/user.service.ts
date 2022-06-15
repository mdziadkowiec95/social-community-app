import { UserInputError } from 'apollo-server';
import { genSalt, compare, hash } from 'bcryptjs';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User as UserModel } from '../models/User.model';
import { UserJWTPayload } from '../types/user.types';
import type { User } from '../types/__generated__/resolvers.types';

const PRIVATE_KEY = 'dummy-key';

class UserService {
  constructor(public userModel: typeof UserModel) {}
  /**
   * Enrypt user password
   */
  public async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);

    return await hash(password, salt);
  }
  /**
   * Compare user passowrd with enrypted passowrd from DB
   */
  public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
  /**
   * Generate JWT for given payload
   */
  public createJSONWebToken<T extends JwtPayload>(payload: T): string {
    return sign(payload, PRIVATE_KEY, {
      expiresIn: 12 * 3600,
    });
  }
  /**
   * Verify if provided JWT is vaild
   */
  public verifyJSONWebToken(token: string): string | JwtPayload {
    return verify(token, PRIVATE_KEY);
  }

  public async getAuthenticatedUser(userAuth: UserJWTPayload | null): Promise<User> {
    const user = await this.userModel.findById(userAuth?.user?.id);

    if (!user) {
      throw new Error('User is not autenticated.');
    }

    return user;
  }
}

export { UserService };
