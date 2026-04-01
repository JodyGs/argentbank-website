import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

interface SignInProps {
  onSignIn: () => void
}

export default function SignIn({ onSignIn }: SignInProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSignIn()
    navigate('/profile')
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Username"
            id="username"
            value={username}
            onChange={setUsername}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Button className="sign-in-button" type="submit">Sign In</Button>
        </form>
      </section>
    </main>
  )
}
