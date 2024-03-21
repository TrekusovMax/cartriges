import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithResult } from '@/shared/config/redux/fetch-base-query'
import { IOffices } from '../model/app.types'

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithResult,
  endpoints: (build) => ({
    getOffices: build.query<IOffices, void>({
      query: () => ({
        url: `offices.json`,
      }),
    }),
  }),
})

export const { useGetOfficesQuery } = appApi
