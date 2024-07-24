import { AppThunk } from '@/app/providers/store-provider/store.types'
import { IPrinter } from '../api/printer.api.types'
import { printerApi } from '../api'

export const addPrinter =
  (printer: IPrinter): AppThunk<Promise<void>> =>
  async (dispatch, _) => {
    await dispatch(printerApi.endpoints.addPrinter.initiate(printer))
      .unwrap()
      .catch((e) => console.error(e))
  }
