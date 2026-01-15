import type { ChangeEvent } from 'react'

type TextareaProps = {
  label?: string
  name?: string
  placeholder?: string
  value?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  rows?: number
  className?: string
}

const Textarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  className = '',
}: TextareaProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full p-2 border rounded-md outline-none text-xs focus:ring-1 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-100'
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-500"> {error} </p>}
    </div>
  )
}

export default Textarea
