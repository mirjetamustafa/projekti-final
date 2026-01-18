type ButtonProps = {
  children: React.ReactNode // children: React.ReactNode → Përmbajtja që do shfaqet brenda butonit (tekst, ikonë, apo elemente të tjera React).
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'active' | 'icon'
  className?: string
}

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'active',
  className = '',
}: ButtonProps) => {
  const variants: Record<string, string> = {
    active: 'w-full text-xs font-bold text-gray-700 px-3 py-2 rounded-md',
    icon: 'w-auto p-2 text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant]} ${className} cursor-pointer`}
    >
      {children}
    </button>
  )
}

export default Button
