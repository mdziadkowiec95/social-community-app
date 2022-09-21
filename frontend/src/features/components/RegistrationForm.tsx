import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export const RegistrationForm = () => {
    return (
        <Form>
            <Form.Field>
                <label>First Name</label>
                <input type='text' placeholder='First Name' />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input type='text' placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input type='email' placeholder='Email' />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='Password' />
            </Form.Field>
            <Form.Field>
                <label>Password confirmation</label>
                <input type='password' placeholder='Password confirmation' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Sign in</Button>
        </Form>
    )
}
