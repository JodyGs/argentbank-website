import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { login } from '../store/authSlice'
import { getProfile } from '../store/userSlice'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const error = useSelector((state: RootState) => state.auth.error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(login({ email, password }))
    if (login.fulfilled.match(result)) {
      await dispatch(getProfile())
      navigate('/profile')
    }
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
            value={email}
            onChange={setEmail}
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
          {error && <p className="error-message">{error}</p>}
          <Button className="sign-in-button" type="submit">Sign In</Button>
        </form>
      </section>
    </main>
  )
}
