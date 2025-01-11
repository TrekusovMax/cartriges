export interface Printers {
  [key: string]: IPrinter
}
export interface IPrinter {
  description: string
  image: string
  ip: string
  isColor: boolean
  office: string
  serialNumber: string
  title: string
  xeroxNumber: string
}

export function isPrinter(item: IPrinter[] | IPrinter): item is IPrinter {
  return 'title' in item
}
export function isPrintersArray(
  item: IPrinter[] | IPrinter,
): item is IPrinter[] {
  return Array.isArray(item)
}
