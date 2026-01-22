import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../lib/AuthContext'
import { RouteType } from './Routes'

interface Props {
  routeType: RouteType
  children: ReactNode
}

const AuthenticationRoute = ({ routeType, children }: Props) => {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) return <p>Loading...</p>

  if (routeType === RouteType.PRIVATE && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (routeType === RouteType.PUBLIC && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AuthenticationRoute
