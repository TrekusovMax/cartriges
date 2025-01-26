export interface PrinterFields {
  description: string
  image: string
  ip: string
  office: string
  serialNumber: number
  title: string
  xeroxNumber: string
  isColor: boolean
}

export type ProgressStatuses =
  | 'normal'
  | 'exception'
  | 'active'
  | 'success'

export type InputFields = keyof Omit<
  PrinterFields,
  'isColor' | 'office' | 'image'
>
export type SwitchField = keyof Pick<PrinterFields, 'isColor'>
export type SelectField = keyof Pick<PrinterFields, 'office' | 'title'>
