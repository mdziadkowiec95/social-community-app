import { userService } from '../../user.service';

describe('user service', () => {
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('comparePasswords() method', () => {
    it('should be defined', () => {
      expect(userService.comparePasswords).toBeDefined();
    });
  });
});
