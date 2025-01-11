import httpService from '../http-client'
const printerEndpoint = '/printers'

export type PrintersDto = {
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

type UpdatePrinterData = PrinterData & { id?: string }

export const printersApi = {
  getPrinters: async (): Promise<PrintersDto> => {
    const { data } = await httpService.get<PrintersDto>(
      printerEndpoint + '.json',
    )
    return data
  },
  getPrinterById: async (id: string): Promise<PrinterData | null> => {
    const { data } = await httpService.get(printerEndpoint + `/${id}.json`)
    return data
  },

  updatePrinter: async (
    payload: UpdatePrinterData,
  ): Promise<PrinterData> => {
    const { id } = payload
    delete payload.id

    const { data } = await httpService.patch(
      printerEndpoint + `/${id}.json`,
      payload,
    )
    return data
  },
  addPrinters: () => {},
  deletePrinters: () => {},
}
