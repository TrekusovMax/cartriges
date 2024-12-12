import { printersApi } from '@/shared/api/modules/printer'
import { useQueryClient } from '@tanstack/react-query'

const printerQueryKey = 'printer'

export const printersListQuery = () => ({
  queryKey: [printerQueryKey, 'list'],
  queryFn: () => {
    return printersApi.getPrinters()
  },
})

export const printerByIdQuery = (id: string) => ({
  queryKey: [printerQueryKey, 'byId', id],
  queryFn: () => printersApi.getPrintersById(id).then((r) => r ?? null),
})

export const useInvaliatePrintersList = () => {
  const queryClient = useQueryClient()

  return () =>
    queryClient.invalidateQueries({
      queryKey: [printerQueryKey, 'list'],
    })
}
