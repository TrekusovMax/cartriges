import { IPrinter } from '@/entities/printer/api/types'

type PrintersDto = {
  [key: string]: {
    description: string
    image: string
    ip: string
    office: string
    serialNumber: string
    title: string
    xeroxNumber: string
    isColor: boolean
  }
}

export function isPrinter(item: IPrinter[] | IPrinter | PrintersDto): item is IPrinter {
  return 'title' in item
}
export function isPrintersArray(item: IPrinter[] | IPrinter): item is IPrinter[] {
  return Array.isArray(item)
}
