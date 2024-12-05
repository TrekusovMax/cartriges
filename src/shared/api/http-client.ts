import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
})
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
}

export default httpService
