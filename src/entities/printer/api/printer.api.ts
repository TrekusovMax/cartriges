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
    findPrinter: build.query<IPrinter, string>({
      query: (id) => `printers/${id}.json`,
    }),
    addPrinter: build.mutation<IPrinter, IPrinter>({
      query: (body) => ({
        url: 'printers.json',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['printers'],
    }),
    editPrinter: build.mutation<IPrinter, { printer: IPrinter; id: string }>({
      query: ({ printer, id }) => ({
        url: `printers/${id}.json`,
        method: 'PATCH',
        body: printer,
      }),
      invalidatesTags: ['printers'],
    }),
    deletePrinter: build.mutation<void, string>({
      query: (id) => ({
        url: `printers/${id}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['printers'],
    }),
  }),
})

export const {
  useGetPrintersQuery,
  useAddPrinterMutation,
  useDeletePrinterMutation,
  useFindPrinterQuery,
} = printerApi
