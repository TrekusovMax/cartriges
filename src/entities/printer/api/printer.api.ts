import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithResult } from '@/shared/config/redux/fetch-base-query'
import { DBOffices } from './printer.api.types'

export const printerApi = createApi({
  reducerPath: 'printerApi',
  baseQuery: baseQueryWithResult,
  tagTypes: ['printersApi'],
  endpoints: (build) => ({
    getPrinters: build.query<DBOffices, void>({
      query: () => ({
        url: `printers.json`,
      }),
    }),
  }),
})

export const { useGetPrintersQuery } = printerApi
