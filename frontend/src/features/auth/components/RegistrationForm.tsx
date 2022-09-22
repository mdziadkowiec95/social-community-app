import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export const RegistrationForm = () => {
    return (
        <Form>
            <Form.Field>
                <input type='text' placeholder='First Name' aria-label='First Name' />
            </Form.Field>
            <Form.Field>
                <input type='text' placeholder='Last Name' aria-label='Last Name' />
            </Form.Field>
            <Form.Field>
                <input type='email' placeholder='Email' aria-label='Email' />
            </Form.Field>
            <Form.Field>
                <input type='password' placeholder='Password' aria-label='Password' />
            </Form.Field>
            <Form.Field>
                <label>Password confirmation</label>
                <input type='password' placeholder='Password confirmation' aria-label='Password confirmation' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Sign in</Button>
        </Form>
    )
}
