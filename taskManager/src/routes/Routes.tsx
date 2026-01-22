import { useRoutes, type RouteObject } from 'react-router-dom'
import AuthenticationRoute from './AuthenticationRoute'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Register'

export enum RouteType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export const newRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthenticationRoute routeType={RouteType.PRIVATE}>
        <Home />
      </AuthenticationRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthenticationRoute routeType={RouteType.PUBLIC}>
        <Login />
      </AuthenticationRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthenticationRoute routeType={RouteType.PUBLIC}>
        <Register />
      </AuthenticationRoute>
    ),
  },
]

export const Routes = () => {
  const routes = useRoutes(newRoutes)

  return routes
}
