import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface StoredAccount {
  name: string
  email: string
  password: string
}

const accountsKey = 'booknest_accounts'

function getAccounts(): StoredAccount[] {
  const savedAccounts = localStorage.getItem(accountsKey)
  if (!savedAccounts) return []
  try {
    return JSON.parse(savedAccounts) as StoredAccount[]
  } catch {
    return []
  }
}

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login'
  const location = useLocation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const normalizedEmail = email.trim().toLowerCase()
    const accounts = getAccounts()

    if (isLogin) {
      const account = accounts.find((item) => item.email === normalizedEmail && item.password === password)
      if (!account) {
        setError('We could not find an account with those details.')
        return
      }
      localStorage.setItem('booknest_current_user', JSON.stringify({ name: account.name, email: account.email }))
      navigate('/')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (accounts.some((account) => account.email === normalizedEmail)) {
      setError('An account with this email already exists. Please sign in.')
      return
    }

    localStorage.setItem(accountsKey, JSON.stringify([...accounts, { name: name.trim(), email: normalizedEmail, password }]))
    navigate('/login', { state: { registered: true } })
  }

  return <main className="auth-page"><div className="auth-panel"><span className="section-kicker">Welcome to BookNest</span><h1>{isLogin ? 'Sign in' : 'Create an account'}</h1><p>{isLogin ? 'Keep your reading list close.' : 'Save your favorite finds for later.'}</p>{location.state?.registered && <p className="auth-message" role="status">Account created. You can now sign in.</p>}<form onSubmit={handleSubmit}>{!isLogin && <label>Name<input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></label>}<label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>{!isLogin && <label>Confirm Password<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" required /></label>}<button className="button" type="submit">{isLogin ? 'Login' : 'Register'}</button></form>{error && <p className="auth-error" role="alert">{error}</p>}<p className="auth-note">This prototype stores demo account details in this browser only.</p><p className="auth-switch">{isLogin ? 'New to BookNest?' : 'Already have an account?'} <Link to={isLogin ? '/register' : '/login'} state={{ from: location.pathname }}>{isLogin ? 'Create an account' : 'Sign in'}</Link></p></div></main>
}
