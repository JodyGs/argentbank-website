import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { editProfile } from '../store/userSlice'
import AccountCard from '../components/AccountCard'
import Button from '../components/Button'
import FormInput from '../components/FormInput'

interface Account {
  title: string
  amount: string
  description: string
}

const ACCOUNTS: Account[] = [
  {
    title: 'Argent Bank Checking (x8349)',
    amount: '$2,082.79',
    description: 'Available Balance',
  },
  {
    title: 'Argent Bank Savings (x6712)',
    amount: '$10,928.42',
    description: 'Available Balance',
  },
  {
    title: 'Argent Bank Credit Card (x8349)',
    amount: '$184.30',
    description: 'Current Balance',
  },
]

export default function User() {
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.user.profile)
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleEdit = () => {
    setFirstName(profile?.firstName ?? '')
    setLastName(profile?.lastName ?? '')
    setIsEditing(true)
  }

  const handleSave = async () => {
    await dispatch(editProfile({ firstName, lastName }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <>
            <h1>Welcome back</h1>
            <div className="edit-form">
              <div className="edit-inputs">
                <FormInput
                  label=""
                  id="firstName"
                  value={firstName}
                  onChange={setFirstName}
                />
                <FormInput
                  label=""
                  id="lastName"
                  value={lastName}
                  onChange={setLastName}
                />
              </div>
              <div className="edit-buttons">
                <Button className="edit-button" onClick={handleSave}>Save</Button>
                <Button className="edit-button" onClick={handleCancel}>Cancel</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {profile?.firstName} {profile?.lastName}!
            </h1>
            <Button className="edit-button" onClick={handleEdit}>Edit Name</Button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {ACCOUNTS.map((account) => (
        <AccountCard key={account.title} {...account} />
      ))}
    </main>
  )
}
