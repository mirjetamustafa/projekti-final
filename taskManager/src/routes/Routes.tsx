import { useRoutes, type RouteObject } from 'react-router-dom'
import AuthenticationRoute from './AuthenticationRoute'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Register'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  GUEST,
}

export const newRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthenticationRoute routeType="private">
        <Home />
      </AuthenticationRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthenticationRoute routeType="public">
        <Login />
      </AuthenticationRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthenticationRoute routeType="public">
        <Register />
      </AuthenticationRoute>
    ),
  },
]

export const Routes = () => {
  const routes = useRoutes(newRoutes)

  return routes
}
