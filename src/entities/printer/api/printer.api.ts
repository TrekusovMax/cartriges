import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithResult } from '@/shared/config/redux/fetch-base-query'
import { DBOffices, IPrinter } from './printer.api.types'

export const printerApi = createApi({
  reducerPath: 'printerApi',
  baseQuery: baseQueryWithResult,
  tagTypes: ['printers'],
  endpoints: (build) => ({
    getPrinters: build.query<DBOffices, void>({
      query: () => ({
        url: `printers.json`,
      }),
      providesTags: ['printers'],
    }),
    addPrinter: build.mutation<IPrinter, IPrinter>({
      query: (body) => ({
        url: 'printers.json',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['printers'],
    }),
  }),
})

export const { useGetPrintersQuery, useAddPrinterMutation } = printerApi
