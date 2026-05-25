import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store/store'
import { logout } from './store/authSlice'
import { clearProfile, getProfile } from './store/userSlice'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const profile = useSelector((state: RootState) => state.user.profile)

  useEffect(() => {
    if (token && !profile) {
      dispatch(getProfile()).then((result) => {
        if (getProfile.rejected.match(result)) {
          dispatch(logout())
          dispatch(clearProfile())
        }
      })
    }
  }, [token, profile, dispatch])

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
