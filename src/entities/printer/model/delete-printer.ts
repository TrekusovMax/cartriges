import { AppThunk } from '@/app/providers/store-provider/store.types'
import { printerApi } from '../api'

export const deletePrinter =
  (id: string): AppThunk<Promise<void>> =>
  async (dispatch, _) => {
    await dispatch(printerApi.endpoints.deletePrinter.initiate(id))
      .unwrap()
      .catch((e) => console.error(e))
  }
