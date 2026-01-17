import { useState } from 'react'
import Button from '../shared/Button/Button'
import Input from '../shared/Input/Input'
import PasswordField from '../shared/PasswordField/PasswordField'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../lib/AuthContext'
import { Link } from 'react-router-dom'

const initialForm = {
  email: '',
  password: '',
}

const LoginForm = () => {
  const [loginData, setLoginData] = useState(initialForm)
  const { login } = useAuthContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(loginData)
      toast.success('Login successful!')
    } catch {
      toast.error('Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="grid justify-center">
        <div className="grid grid-cols-1 justify-items-center my-5">
          <h1 className="text-2xl font-bold py-1 text-blue-500">Login</h1>
        </div>
        <div className="border border-gray-200 bg-white shadow-xs rounded-md p-5 w-[450px]">
          <form onSubmit={handleSubmit}>
            <div className=" m-3">
              <Input
                label="Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              <PasswordField
                label="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <Button
                type="submit"
                className="bg-blue-600 text-white py-3 my-3"
              >
                Sign in
              </Button>
            </div>
          </form>
          <p className="text-xs text-center text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
