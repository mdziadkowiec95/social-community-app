import gravatar from 'gravatar';
import { UserModel } from '../../models/User.model';
import { userServiceFactory } from '../user.service';

const UserModelStub = {
  findById: (id: string) => Promise.resolve(id),
} as unknown as typeof UserModel;

describe('user service', () => {
  it('should create', () => {
    const service = userServiceFactory({ UserModel: UserModelStub, avatar: gravatar });

    expect(service).toBeDefined();
  });

  describe('encryptPassword() method', () => {
    it('should be defined', () => {
      const service = userServiceFactory({ UserModel: UserModelStub, avatar: gravatar });

      expect(service.encryptPassword).toBeDefined();
    });
  });

  describe('comparePasswords() method', () => {
    it('should be defined', () => {
      const service = userServiceFactory({ UserModel: UserModelStub, avatar: gravatar });

      expect(service.comparePasswords).toBeDefined();
    });
  });
});
