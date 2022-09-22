import { byTestId } from '../helpers/query';

export const HomePage = {
  visit() {
    cy.visit('/');
  },

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
