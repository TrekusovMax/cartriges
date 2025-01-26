export interface Printers {
  [key: string]: IPrinter
}
export interface IPrinter {
  description: string | undefined
  image: string
  ip: string | undefined
  office: string
  serialNumber: number
  title: string
  xeroxNumber: string
  isColor: boolean
}
