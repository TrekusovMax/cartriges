export interface Printers {
  [key: string]: IPrinter
}
export interface IPrinter {
  id?: string
  image: string
  title: string
  isColor: boolean
  serialNumber: string
  xeroxNumber: string
  ip: string | ''
  office: string
  description: string | ''
}
