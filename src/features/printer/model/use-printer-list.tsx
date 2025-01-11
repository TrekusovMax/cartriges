import { useSuspenseQuery } from '@tanstack/react-query'
import { printersListQuery } from '@/entities/printer/queries'

export function usePrintersList() {
  return useSuspenseQuery({
    ...printersListQuery(),
    initialData: {},
  })
}
