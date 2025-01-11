import httpService from '../http-client'
const officeEndpoint = '/offices'

type OfficesDto = {
  [key: string]: {
    address: string
    image: string
    name: string
  }
}

export const officesApi = {
  getOffices: async (): Promise<OfficesDto> => {
    const { data } = await httpService.get(officeEndpoint + '.json')
    return data
  },
  getofficeById: async (id: string): Promise<OfficesDto> => {
    const { data } = await httpService.get(officeEndpoint + `/${id}.json`)
    return data
  },
}
