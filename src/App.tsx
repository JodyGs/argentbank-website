import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'

export default function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <User /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
