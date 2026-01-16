import { apiRequest } from '../Api'
import {
  LoginInput,
  RegisterInput,
  User,
  SetPasswordInput,
  SetPasswordResponse,
} from './user.types'

export const login = async (data: LoginInput) =>
  apiRequest<any, any>({
    method: 'POST',
    url: 'api/auth/login',
    data: { credentials: data },
  })

export const register = async (data: RegisterInput) =>
  apiRequest<any, User>({
    method: 'POST',
    url: '/api/auth/register',
    data: { credentials: data },
  })

export const resetPassword = async (data: SetPasswordInput, token: string) =>
  apiRequest<SetPasswordInput, SetPasswordResponse>({
    method: 'POST',
    url: `auth/reset-password`,
    data,
    params: {
      token,
    },
  })

export const getUserDetails = async () =>
  apiRequest<undefined, User>({ method: 'GET', url: 'users/me' })
