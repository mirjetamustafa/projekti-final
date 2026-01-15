type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  icon?: React.ReactNode
  isSearch?: boolean
}

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  isSearch = false,
}: InputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {' '}
            {icon}{' '}
          </span>
        )}

        <input
          type={isSearch ? 'search' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full p-2 text-xs  border rounded-md outline-none
          focus:ring-1 focus:ring-blue-500
          ${icon ? 'pl-9' : ''}
          ${error ? 'border-red-500' : 'border-gray-200'}`}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input
