import { printersApi } from '@/shared/api/modules/printer'
import { QueryCache, useQueryClient } from '@tanstack/react-query'

export const printerQueryKey = 'printer'

export const printersListQuery = () => ({
  queryKey: [printerQueryKey, 'list'],
  queryFn: () => {
    return printersApi.getPrinters()
  },
})

export const printerByIdQuery = (id: string) => ({
  queryKey: [printerQueryKey, 'byId', id],
  queryFn: () => printersApi.getPrinterById(id).then((r) => r ?? null),
})

export const useInvaliatePrintersList = (id?: string) => {
  const queryClient = useQueryClient()
  const queryCache = new QueryCache().clear()
  return () => {
    queryClient.invalidateQueries({
      queryKey: [printerQueryKey, 'list', id],
    })
    queryCache
  }
}
