export type OfficeType = {
  name: string
  image: string
  address: string
}
export interface IOffices {
  [key: string]: OfficeType
}
