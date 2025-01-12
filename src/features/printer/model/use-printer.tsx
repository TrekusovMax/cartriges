import { useSuspenseQuery } from '@tanstack/react-query'
import { printerByIdQuery } from '@/entities/printer/queries'

export function usePrinter(id: string) {
  const { data, refetch } = useSuspenseQuery({
    ...printerByIdQuery(id),
  })
  return { data, refetch }
}
