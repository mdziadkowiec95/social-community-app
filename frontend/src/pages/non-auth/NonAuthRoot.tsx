import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export const NonAuthRoot = () => {
    fetch('/api/user/login', {
        method: 'post',
    })

    return (
        <div>
            <Link to='terms-of-use'>Terms of use</Link>
            <Link to='app'>App</Link>
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}
