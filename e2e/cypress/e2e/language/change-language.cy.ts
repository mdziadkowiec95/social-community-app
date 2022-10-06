import { HomePage } from '../../pages/HomePage';

describe('Language > Changing language', () => {
  it('changes language properly', () => {
    HomePage.visit();
    HomePage.switchLanguage();
  });
});
