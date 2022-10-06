import { byRole, byTestId } from '../helpers/query';

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
  languagePicker: {
    dropdown: () => cy.get(byTestId('language-picker-dropdown')),
    code: () => cy.get(`${byTestId('language-picker-dropdown')} .divider`),
    option: () => cy.get(`${byTestId('language-picker-dropdown')} ${byRole('option')}`),
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
  switchLanguage: () => {
    HomePage.locators.languagePicker.dropdown().click();
    HomePage.locators.languagePicker.option().contains('Polish').click();
    HomePage.locators.languagePicker.code().contains('PL');
    HomePage.locators.languagePicker.dropdown().click();
    HomePage.locators.languagePicker.option().contains('Angielski').click();
    HomePage.locators.languagePicker.code().contains('EN');
  },
};
