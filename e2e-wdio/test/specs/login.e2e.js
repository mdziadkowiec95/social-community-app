import { LoginPage } from '../page-objects/login.page';

describe('Login page', () => {
  it('switches from Login form to Create New Account form', async () => {
    await LoginPage.open();

    await LoginPage.checkIfLoginFormIsDisplayed();
    await LoginPage.checkIfRegistrationFormDisplayed(false);
    await LoginPage.switchToCreateNewAccount();
    await LoginPage.checkIfRegistrationFormDisplayed(true);
  });
});
