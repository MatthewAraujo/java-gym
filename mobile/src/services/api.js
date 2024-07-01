import axios from 'axios'
import { storageAuthTokenGet, storageAuthTokenSave } from '../storage/storageAuthToken'
import { AppError } from '../utils/AppError'



const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 6000
})

let failedQueue = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response,
    async requestError => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const { refresh_token } = await storageAuthTokenGet()

          if (!refresh_token) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSucess: (token) => {
                  originalRequestConfig.headers = {
                    ...originalRequestConfig.headers,
                    Authorization: `Bearer ${token}`
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error) => {
                  reject(error)
                }
              })
            })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', {
                refresh_token
              })

              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token
              })

              if (
                originalRequestConfig.data &&
                !(originalRequestConfig.data instanceof FormData)
              ) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                )
              }

              originalRequestConfig.headers = {
                ...originalRequestConfig.headers,
                Authorization: `Bearer ${data.token}`
              }

              api.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${data.token}`

              failedQueue.forEach(request => {
                request.onSucess(data.token)
              })

              resolve(api(originalRequestConfig))
            } catch (error) {
              failedQueue.forEach(request => {
                request.onFailure(error)
              })

              signOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }

        signOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    }
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
