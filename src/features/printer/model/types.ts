export type Printers = {
  [key: string]: PrinterData
}
type PrinterData = {
  description: string
  image: string
  ip: string
  isColor: boolean
  office: string
  serialNumber: string
  title: string
  xeroxNumber: string
}
