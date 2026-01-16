export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  role?: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
}

export interface SetPasswordInput {
  password: string
  confirmPassword: string
}

export interface SetPasswordResponse {
  message: string
}
