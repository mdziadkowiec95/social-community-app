import { byTestId } from '../../helpers/query';

describe('Join as new user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows Login form for guest users', () => {
    cy.get(byTestId('login-form-email-field')).should('be.visible');
    cy.get(byTestId('login-form-password-field')).should('be.visible');
    cy.get(byTestId('login-form-submit-button')).should('be.visible');
  });

  it('switches from Login form to Create New Account form', () => {
    cy.get(byTestId('login-form-submit-button')).should('be.visible');
    cy.get(byTestId('sign-in-form-submit-button')).should('not.exist');
    cy.get(byTestId('create-new-account-button')).click();

    cy.get(byTestId('sign-in-form-submit-button')).should('be.visible');
  });
});
