import { createApi } from '@reduxjs/toolkit/query/react'
import { baseStoreQueryWithResult } from '@/shared/config/redux/fetch-base-query-store'
import { DBOffices } from './printer.api.types'

export const printerApi = createApi({
  reducerPath: 'printerApi',
  baseQuery: baseStoreQueryWithResult,
  tagTypes: ['Printers'],
  endpoints: (build) => ({
    getPrinters: build.query<DBOffices, void>({
      query: () => ({
        url: `/`,
      }),
      providesTags: ['Printers'],
    }),
  }),
})

export const { useGetPrintersQuery } = printerApi
