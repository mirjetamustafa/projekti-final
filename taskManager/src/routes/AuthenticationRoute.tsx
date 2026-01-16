import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../lib/AuthContext'

interface Props {
  routeType: 'private' | 'public'
  children: ReactNode
}

const AuthenticationRoute = ({ routeType, children }: Props) => {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) return <p>Loading...</p>

  if (routeType === 'private' && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (routeType === 'public' && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AuthenticationRoute
