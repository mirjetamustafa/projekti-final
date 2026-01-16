import axios from 'axios'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/User/user'

interface User {
  token: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: UserLoginData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ token })
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: UserLoginData) => {
    setIsLoading(true)
    try {
      const res = await loginUser(credentials)
      const token = res.data.token
      setUser({ token })
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.Authorization
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
