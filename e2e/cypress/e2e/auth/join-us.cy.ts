import { HomePage } from '../../pages/HomePage';

describe('Join as new user', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('shows Login form for guest users', () => {
    HomePage.verifyLoginForm();
  });

  it('switches from Login form to Create New Account form', () => {
    HomePage.switchToCreateNewAccount();
  });
});
