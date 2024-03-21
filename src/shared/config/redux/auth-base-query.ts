import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const authBaseQuery = fetchBaseQuery({
  baseUrl: 'https://identitytoolkit.googleapis.com/v1/',
  prepareHeaders: (headers) => {
    headers.append('Content-Type', 'application/json')
    return headers
  },
})
