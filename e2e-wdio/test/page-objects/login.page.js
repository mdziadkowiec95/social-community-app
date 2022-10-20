/**
 * sub page containing specific selectors and methods for a specific page
 */

import { byTestId } from '../helpers/selectors';

const selectors = {
  loginForm: {
    submitButton: `[data-testid="login-form-submit-button"]`,
  },
  registrationForm: {
    submitButton: `[data-testid="sign-in-form-submit-button"]`,
  },
  createNewAccountButton: byTestId('create-new-account-button'),
};

const LoginPage = {
  open() {
    return browser.url(`/`);
  },

  async switchToCreateNewAccount() {
    return await $(selectors.createNewAccountButton).click();
  },

  async checkIfLoginFormIsDisplayed() {
    const loginFormSubmitButton = await $(selectors.loginForm.submitButton);

    await loginFormSubmitButton.waitForDisplayed();
  },

  async checkIfRegistrationFormDisplayed(expectDisplayed = true) {
    const registrationFormSubmitButton = await $(selectors.registrationForm.submitButton);

    if (expectDisplayed) {
      await registrationFormSubmitButton.waitForDisplayed();
    } else {
      expect(registrationFormSubmitButton).not.toBeDisplayed();
    }
  },
};

export { LoginPage };
