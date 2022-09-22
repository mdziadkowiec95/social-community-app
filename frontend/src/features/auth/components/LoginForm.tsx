import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = () => {
    return (
        <Form>
            <Form.Field>
                <input type='email' placeholder='Email' aria-label='Email' />
            </Form.Field>
            <Form.Field>
                <input type='password' placeholder='Password' aria-label='Password' />
            </Form.Field>
            <Button>Log in</Button>
        </Form>
    )
}

export default LoginForm