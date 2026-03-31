import { Link } from 'react-router-dom'

interface HeaderProps {
  isLoggedIn: boolean
  userName?: string
  onSignOut: () => void
}

export default function Header({ isLoggedIn, userName, onSignOut }: HeaderProps) {
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
              {' '}{userName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={onSignOut}>
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
