export interface DBOffices {
  [key: string]: IPrinter
}
export interface IPrinter {
  id?: string
  image: string
  title: string
  isColor: boolean
  serialNumber: string
  xeroxNumber: string
  ip: string | undefined
  office: string
  description: string | undefined
}
