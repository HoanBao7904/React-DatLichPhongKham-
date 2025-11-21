// import type { SuccessResponseApi } from 'src/types/utils.type'

import type { LoginResponse } from 'src/types/auth.type'
import type { RegisterBody } from 'src/types/user.type'
import http from 'src/utils/http'

const AuthApi = {
  registerAccount: (body: RegisterBody) => http.post<LoginResponse>('/auth/signUp', body),
  LoginAccount: (body: { userName: string; password: string }) => http.post<LoginResponse>('/auth/signIn', body),
  Logout: () => http.post('/auth/logout')
}

export default AuthApi

// export const registerAccount = (body: RegisterBody) => http.post<AuthResponse>('/auth/signUp', body)

// export const LoginAccount = (body: { userName: string; password: string }) =>
//   http.post<AuthResponse>('/auth/signIn', body)

// export const Logout = () => http.post('/auth/logout')
