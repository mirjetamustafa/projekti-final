type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'active'
  className?: string
}

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` text-xs w-full font-bold rounded-md hover:bg-gray-100 cursor-pointer 
        ${
          variant === 'active'
            ? 'text-gray-700'
            : 'hover:bg-gray-100 text-gray-700'
        }
        ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
