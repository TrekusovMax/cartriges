export interface DBOffices {
  //items: [{ name: string; bucket: string }]
  [key: string]: IPrinter
}
export interface IPrinter {
  id?: string
  image: string
  title: string
  serialNumber: string
  xeroxNumber: string
  ip: string | undefined
  office: string
  description: string | undefined
}
