import { IPrinter } from '@/entities/printer/api/printer.api.types'

export function isPrinter(item: IPrinter[] | IPrinter): item is IPrinter {
  return 'title' in item
}
export function isPrintersArray(item: IPrinter[] | IPrinter): item is IPrinter[] {
  return Array.isArray(item)
}
