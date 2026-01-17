import React, { useState } from 'react'
import Button from '../shared/Button/Button'
import Input from '../shared/Input/Input'
import PasswordField from '../shared/PasswordField/PasswordField'

import { toast } from 'react-toastify'
import { register } from '../../api/User/user'
import { Link } from 'react-router-dom'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const RegisterForm = () => {
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password don't match")
      return
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      toast.success('Registered successfully!')
      console.log('Registered user:', res.data)
      setFormData(initialForm)
    } catch (err: any) {
      toast.error('Regstration failed')
      console.error(err)
    }
  }
  console.log(formData)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="grid justify-center">
        <div className="grid grid-cols-1 justify-items-center my-5">
          <h1 className="text-2xl font-bold py-1 text-blue-500">
            Create account
          </h1>
        </div>
        <div className="border border-gray-200 bg-white shadow-xs rounded-md p-5 w-[450px]">
          <form onSubmit={handleSubmit}>
            <div className=" m-3">
              <Input
                label="Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <PasswordField
                label="Password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordField
                label="Confirm Password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="bg-blue-600 text-white py-3 my-3"
              >
                Create account
              </Button>
            </div>
          </form>
          <p className="text-xs text-center text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              {' '}
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
