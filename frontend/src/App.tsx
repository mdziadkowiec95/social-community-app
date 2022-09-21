import React from 'react'
import { Container } from 'semantic-ui-react'
import './App.css'
import { RegistrationPage } from './pages/RegistrationPage'

function App() {
  fetch('/api/user/login', {
    method: 'post',
  })

  return (
    <div>
      <main>
        <Container>
          <a
            data-testid="go-to-react-page"
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          <RegistrationPage />
        </Container>
      </main>
    </div>
  )
}

export default App
