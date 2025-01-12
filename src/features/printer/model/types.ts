export type Printers = {
  [key: string]: PrinterData
}
export type PrinterData = {
  description: string
  image: string
  ip: string
  isColor: boolean
  office: string
  serialNumber: string
  title: string
  xeroxNumber: string
}
export type UpdatePrinterData = PrinterData & { id: string }
