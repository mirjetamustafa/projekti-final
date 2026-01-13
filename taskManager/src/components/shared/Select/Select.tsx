type Option = {
  label: string
  value: string
}

type SelectProps = {
  label?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  placeholder?: string
  error?: string
}

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}: SelectProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {' '}
          {label}{' '}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 border text-xs rounded-md bg-white outline-none focus:ring-1 focus:ring-blue-500
        ${error ? 'border-red-500' : 'border-gray-200'}`}
      >
        <option value="" disabled>
          {' '}
          {placeholder}{' '}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500"> {error} </p>}
    </div>
  )
}

export default Select
