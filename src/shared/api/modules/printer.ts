import httpService from '../http-client'
const printerEndpoint = '/printers.json'

type PrintersDto = {
  [key: string]: {
    description: string
    image: string
    ip: string
    office: string
    serialNumber: string
    title: string
    xeroxNumber: string
    isColor: boolean
  }
}

export const printersApi = {
  getPrinters: async (): Promise<PrintersDto> => {
    const { data } = await httpService.get(printerEndpoint)
    return data
  },
  getPrintersById: async (id: string): Promise<PrintersDto | undefined> => {
    const { data } = await httpService.get(printerEndpoint)

    return data[id]
  },
  addPrinters: () => {},
  deletePrinters: () => {},
}
