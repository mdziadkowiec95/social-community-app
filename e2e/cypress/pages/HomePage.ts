import { byTestId } from '../helpers/query';

// Namespace with UI locator functions
const locators = {
  createNewAccountButton: () => cy.get(byTestId('create-new-account-button')),
  loginForm: {
    email: () => cy.get(byTestId('login-form-email-field')),
    password: () => cy.get(byTestId('login-form-password-field')),
    submitBtn: () => cy.get(byTestId('login-form-submit-button')),
  },
  registrationForm: {
    submitBtn: () => cy.get(byTestId('sign-in-form-submit-button')),
  },
};

// Page namespace
export const HomePage = {
  locators,
  visit: () => cy.visit('/'),
  verifyLoginForm: () => {
    HomePage.locators.loginForm.email().should('be.visible');
    HomePage.locators.loginForm.password().should('be.visible');
    HomePage.locators.loginForm.submitBtn().should('be.visible');
  },
  switchToCreateNewAccount: () => {
    HomePage.locators.loginForm.submitBtn().should('be.visible');
    HomePage.locators.registrationForm.submitBtn().should('not.exist');
    HomePage.locators.createNewAccountButton().click();
    HomePage.locators.registrationForm.submitBtn().should('be.visible');
  },
};
