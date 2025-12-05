import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import { toast } from 'react-toastify'
import type { LoginResponse } from 'src/types/auth.type'
import { clearTokenLS, getAccessToken, saveAccessToken } from './auth'

class Https {
  instance: AxiosInstance
  private token: string
  constructor() {
    this.token = getAccessToken()
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 1000 * 3,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.token && config.headers) {
          config.headers.Authorization = `Bearer ${this.token}`
          //chú ý
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/auth/signIn') {
          const data = response.data as LoginResponse
          this.token = data.data!.token // Bỏ dấu !
          saveAccessToken(this.token)
          if (data.data?.user) {
            localStorage.setItem('profile', JSON.stringify(data.data.user))
          }
        } else if (url === '/auth/signUp') {
          const data = response.data as LoginResponse
          // Register không có token, chỉ lưu profile
          if (data.data) {
            localStorage.setItem('profile', JSON.stringify(data.data))
          }
        } else if (url === '/auth/logout') {
          this.token = ''
          clearTokenLS()
        }
        // console.log(response)
        return response
      },
      function onRejected(error: AxiosError) {
        if (error.response?.status !== 409) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Https().instance

export default http
