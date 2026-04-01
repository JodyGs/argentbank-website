import AccountCard from '../components/AccountCard'
import Button from '../components/Button'

interface Account {
  title: string
  amount: string
  description: string
}

const accounts: Account[] = [
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
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          Tony Jarvis!
        </h1>
        <Button className="edit-button">Edit Name</Button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <AccountCard key={account.title} {...account} />
      ))}
    </main>
  )
}
