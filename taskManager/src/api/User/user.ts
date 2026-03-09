import { apiRequest } from '../Api'
import type { LoginInput, RegisterInput } from './user.types'

export const register = (data: RegisterInput) => {
  return apiRequest({
    url: '/api/auth/register',
    method: 'POST',
    data: {
      credentials: data,
    },
  })
}

export const loginUser = (credentials: LoginInput): any => {
  return apiRequest({
    url: '/api/auth/login',
    method: 'POST',
    data: {
      credentials,
    },
  })
}
