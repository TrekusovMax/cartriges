import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithResult } from '@/shared/config/redux/fetch-base-query'
import { ICartrige } from './cartrige.api.types'

export const cartrigeApi = createApi({
  reducerPath: 'cartrigeApi',
  baseQuery: baseQueryWithResult,
  tagTypes: ['cartriges'],
  endpoints: (build) => ({
    getCartriges: build.query<ICartrige[], void>({
      query: () => ({
        url: `printers.json`,
      }),
      providesTags: ['cartriges'],
    }),
    /* findPrinter: build.query<IPrinter, string>({
      query: (id) => `printers/${id}.json`,
    }),*/
    addCartrige: build.mutation<ICartrige, ICartrige>({
      query: (body) => ({
        url: 'cartriges.json',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cartriges'],
    }),
    /*editPrinter: build.mutation<IPrinter, { printer: IPrinter; id: string }>({
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
    }),*/
  }),
})

export const { useGetCartrigesQuery } = cartrigeApi
