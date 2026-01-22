import { apiRequest } from '../Api'
import type { LoginInput, RegisterInput } from './user.types'

export const register = (data: RegisterInput) => {
  return apiRequest({
    url: '/api/auth/register',
    method: 'POST',
    data: {
      credentials: data,
      // Body i request-it
      //Dërgon objekt me key credentials
      //Brenda tij janë të dhënat e regjistrimit
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
