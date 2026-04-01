interface FormInputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (value: string) => void
}

export default function FormInput({ label, id, type = 'text', value, onChange }: FormInputProps) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
