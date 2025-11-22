import axios, { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxios409<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === 409 //409
}

export function isAxios401<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === 401 //409
}
export function isAxios400<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === 400 //409
}

export function isAxios500<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === 500
}

export const decodeToken = (token: string) => {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch {
    return null
  }
}
