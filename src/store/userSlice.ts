import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserProfile, updateUserProfile, type UserProfile } from '../services/api'
import type { RootState } from './store'

interface UserState {
  profile: UserProfile | null
  error: string | null
}

const initialState: UserState = {
  profile: null,
  error: null,
}

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (!token) throw new Error('No token')
    return fetchUserProfile(token)
  },
)

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async ({ firstName, lastName }: { firstName: string; lastName: string }, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (!token) throw new Error('No token')
    return updateUserProfile(token, firstName, lastName)
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.error = null
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch profile'
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.error = null
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update profile'
      })
  },
})

export const { clearProfile } = userSlice.actions
export default userSlice.reducer
