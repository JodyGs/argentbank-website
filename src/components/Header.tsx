import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { logout } from '../store/authSlice'
import { clearProfile } from '../store/userSlice'

export default function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const profile = useSelector((state: RootState) => state.user.profile)

  const handleSignOut = () => {
    dispatch(logout())
    dispatch(clearProfile())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {' '}{profile?.firstName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              {' '}Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            {' '}Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
