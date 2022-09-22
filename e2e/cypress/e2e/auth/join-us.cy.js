import { HomePage } from '../../pages/HomePage';

describe('Join as new user', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('shows Login form for guest users', () => {
    HomePage.loginForm.email().should('be.visible');
    HomePage.loginForm.password().should('be.visible');
    HomePage.loginForm.submitBtn().should('be.visible');
  });

  it('switches from Login form to Create New Account form', () => {
    HomePage.loginForm.submitBtn().should('be.visible');
    HomePage.registrationForm.submitBtn().should('not.exist');
    HomePage.createNewAccountButton().click();
    HomePage.registrationForm.submitBtn().should('be.visible');
  });
});
