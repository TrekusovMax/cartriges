import { officesListQuery } from '@/entities/office/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useOfficesList = () => {
  return useSuspenseQuery({
    ...officesListQuery(),
    initialData: {},
  })
}
