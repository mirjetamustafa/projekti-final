import axios from 'axios'
import {
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
  name: string
  email?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: UserLoginData) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser)
      setUser(parsedUser)
      axios.defaults.headers.common.Authorization = `Bearer ${parsedUser.token}`
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: UserLoginData) => {
    setIsLoading(true)
    try {
      const res = await loginUser(credentials)
      const { token, user: userData } = res.data

      const newUser: User = {
        token,
        name: userData.name,
        email: userData.email,
      }

      setUser(newUser)

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(newUser))
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      navigate('/')
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
