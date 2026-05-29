import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data)
    return response
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

export default apiClient
