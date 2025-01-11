import { useSuspenseQuery } from '@tanstack/react-query'
import { printerByIdQuery } from '@/entities/printer/queries'

export function usePrinter(id: string) {
  return useSuspenseQuery({
    ...printerByIdQuery(id),
  })
}
