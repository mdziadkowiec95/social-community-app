import { genSalt, compare, hash } from 'bcryptjs';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const PRIVATE_KEY = 'dummy-key';

class UserService {
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
  public createJSONWebToken(payload: object): string {
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
}

export { UserService };
