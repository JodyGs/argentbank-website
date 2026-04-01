import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser } from '../services/api'

interface AuthState {
  token: string | null
  isLoggedIn: boolean
  error: string | null
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const token = await loginUser(email, password)
    return token
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.isLoggedIn = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message ?? 'Login failed'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
