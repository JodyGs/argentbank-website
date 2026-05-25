import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

export async function loginUser(email: string, password: string): Promise<string> {
  const { data } = await api.post('/user/login', { email, password })
  return data.body.token
}

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
}

export async function fetchUserProfile(token: string): Promise<UserProfile> {
  const { data } = await api.post(
    '/user/profile',
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return data.body
}

export async function updateUserProfile(
  token: string,
  firstName: string,
  lastName: string,
): Promise<UserProfile> {
  const { data } = await api.put(
    '/user/profile',
    { firstName, lastName },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return data.body
}
