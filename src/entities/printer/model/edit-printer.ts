import { AppThunk } from '@/app/providers/store-provider/store.types'
import { IPrinter } from '../api/printer.api.types'
import { printerApi } from '../api'

interface IEditPrinter {
  printer: IPrinter
  id: string
}

export const editPrinter =
  ({ printer, id }: IEditPrinter): AppThunk<Promise<unknown>> =>
  async (dispatch, _) => {
    delete printer.id
    return await dispatch(printerApi.endpoints.editPrinter.initiate({ printer, id }))
      .unwrap()
      .catch((e) => console.error(e))
  }
