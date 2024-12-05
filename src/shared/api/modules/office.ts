import httpService from '../http-client'
const printerEndpoint = '/offices.json'

type OfficesDto = {
  [key: string]: {
    address: string
    image: string
    name: string
  }
}

export const officesApi = {
  getOffices: async (): Promise<OfficesDto> => {
    const { data } = await httpService.get(printerEndpoint)
    return data
  },
  addPrinters: () => {},
  deletePrinters: () => {},
}
