import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import LoginForm from '../../features/auth/components/LoginForm';
import { RegistrationForm } from '../../features/auth/components/RegistrationForm'

export const JoinUs = () => {
    const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false);

    const showRegistrationForm = () => setIsCreatingNewAccount(true);

    return (
        <div>
            <p>Social community App helps you get connected and organized with the group of people you like!</p>

            {!isCreatingNewAccount && (
                <>
                    <LoginForm />
                    or
                    <Button primary onClick={showRegistrationForm} data-testid='createNewAccountButton'>Create new account</Button>
                </>
            )}
            {isCreatingNewAccount && <RegistrationForm />}
        </div>
    )
}
