import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Icon } from './Icon'

interface CurrentUser {
  name: string
  email: string
}

function readCurrentUser(): CurrentUser | null {
  const savedUser = localStorage.getItem('booknest_current_user')
  if (!savedUser) return null
  try {
    return JSON.parse(savedUser) as CurrentUser
  } catch {
    return null
  }
}

export function Navbar() {
  const { itemCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(readCurrentUser)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    setCurrentUser(readCurrentUser())
    setProfileOpen(false)
  }, [location.pathname])

  const logout = () => {
    localStorage.removeItem('booknest_current_user')
    setCurrentUser(null)
    setProfileOpen(false)
    navigate('/')
  }

  const initials = currentUser?.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">BookNest</Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/#catalog">Books</NavLink>
          <NavLink to="/#categories">Categories</NavLink>
        </nav>
        <div className="header-actions">
          <NavLink className="action-link search-link" to="/#catalog"><Icon name="search" size={18} /><span>Search</span></NavLink>
          <NavLink className="action-link" to="/cart"><Icon name="bag" size={18} /><span>Cart</span>{itemCount > 0 && <b className="cart-count">{itemCount}</b>}</NavLink>
          {currentUser ? <div className="profile-area">
            <button className="profile-button" type="button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} aria-label="Open profile menu">
              <span className="profile-avatar"><Icon name="user" size={17} /></span>
              <span className="profile-name">{initials}</span>
            </button>
            {profileOpen && <div className="profile-menu">
              <strong>{currentUser.name}</strong>
              <span>{currentUser.email}</span>
              <button type="button" onClick={logout}>Log out</button>
            </div>}
          </div> : <NavLink className="login-link" to="/login">Login</NavLink>}
        </div>
      </div>
    </header>
  )
}
