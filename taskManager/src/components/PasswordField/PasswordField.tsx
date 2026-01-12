import { useState } from 'react'
import eyeOn from '../../assets/eyeOn.svg'
import eyeOff from '../../assets/eyeOff.svg'

type PasswordInputProps = {
  label?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const PasswordField = ({
  label,
  placeholder,
  value,
  onChange,
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {' '}
          {label}{' '}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full p-2 text-xs  border rounded-md outline-none
          focus:ring-1 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer
             outline-none focus:outline-none focus:ring-0"
        >
          {showPassword ? (
            <img
              src={eyeOn}
              alt="show"
              className="w-5 h-5 opacity-60 hover:opacity-80"
            />
          ) : (
            <img
              src={eyeOff}
              alt="hide"
              className="w-5 h-5 opacity-60 hover:opacity-80"
            />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default PasswordField
