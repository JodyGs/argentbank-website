interface ButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function Button({ children, className = '', type = 'button', onClick }: ButtonProps) {
  return (
    <button
      className={`button-primary ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
