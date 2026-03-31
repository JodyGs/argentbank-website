import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSignIn = () => {
    setIsLoggedIn(true)
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userName="Tony" onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/profile" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
