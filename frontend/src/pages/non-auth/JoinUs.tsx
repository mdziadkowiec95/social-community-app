import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { RegistrationForm } from '../../features/auth/components/RegistrationForm';
// import { NS } from '../../i18n/namespaces'

export const JoinUs = () => {
  const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false);
  const { t } = useTranslation();
  const showRegistrationForm = () => setIsCreatingNewAccount(true);

  return (
    <div>
      <p></p>
      <p>{t('home:socialCommunityAppIntro')}</p>

      {!isCreatingNewAccount && (
        <>
          <LoginForm />
          {t('common:or')}
          <Button onClick={showRegistrationForm} data-testid='create-new-account-button'>
            {t('common:createNewAccount')}
          </Button>
        </>
      )}
      {isCreatingNewAccount && <RegistrationForm />}
    </div>
  );
};
