import { officesApi } from '@/shared/api/modules/office'
import { useQueryClient } from '@tanstack/react-query'

export const officeQueryKey = 'office'

export const officesListQuery = () => ({
  queryKey: [officeQueryKey, 'list'],
  queryFn: () => {
    return officesApi.getOffices()
  },
})

export const officeByIdQuery = (id: string) => ({
  queryKey: [officeQueryKey, 'byId', id],
  queryFn: () => officesApi.getofficeById(id).then((r) => r ?? null),
})

export const useInvaliateOfficesList = () => {
  const queryClient = useQueryClient()

  return () =>
    queryClient.invalidateQueries({
      queryKey: [officeQueryKey, 'list'],
    })
}
