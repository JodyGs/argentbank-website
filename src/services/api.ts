const BASE_URL = 'http://localhost:3001/api/v1'

export async function loginUser(email: string, password: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()
  if (data.status !== 200) {
    throw new Error(data.message)
  }
  return data.body.token
}

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
}

export async function fetchUserProfile(token: string): Promise<UserProfile> {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await response.json()
  if (data.status !== 200) {
    throw new Error(data.message)
  }
  return data.body
}

export async function updateUserProfile(
  token: string,
  firstName: string,
  lastName: string,
): Promise<UserProfile> {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  })
  const data = await response.json()
  if (data.status !== 200) {
    throw new Error(data.message)
  }
  return data.body
}
