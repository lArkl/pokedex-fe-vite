import axios from 'axios'
import { API_ENDPOINT } from '../config/main'

const DELAY_TIME = 400

export const waitRequest = async <T>(promise: Promise<T>, delay = DELAY_TIME) => {
  const [, result] = await Promise.all([new Promise((resolve) => setTimeout(resolve, delay)), promise])
  return result
}

export const pokeApi = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
})

pokeApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const errorName = error.response.data?.error?.name ?? ''
    const errorMessage = error.response.data?.error?.message ?? ''
    const notFoundError = errorName === 'AuthTokenError' && errorMessage.includes('not found')

    if (error.response.status === 401 && notFoundError && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await pokeApi.post('/auth/refresh')
        return pokeApi(originalRequest) // Retry the original request with the new token
      } catch (refreshError) {
        console.log('asda', refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
