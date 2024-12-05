import httpService from '../http-client'
const printerEndpoint = '/printers.json'

type PrintersDto = {
  [key: string]: {
    description: string
    image: string
    ip: string
    office: string
    serialNumber: number
    title: string
    xeroxNumber: string
  }
}

export const printersApi = {
  getPrinters: async (): Promise<PrintersDto> => {
    const { data } = await httpService.get(printerEndpoint)
    return data
  },
  addPrinters: () => {},
  deletePrinters: () => {},
}
