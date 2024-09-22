import { AppThunk } from '@/app/providers/store-provider/store.types'
import { ICartrige } from '../api/cartrige.api.types'
import { cartrigeApi } from '../api/cartrige.api'

export const addCartrige =
  (cartrige: ICartrige): AppThunk<Promise<void | ICartrige>> =>
  async (dispatch, _) => {
    return await dispatch(cartrigeApi.endpoints.addCartrige.initiate(cartrige))
      .unwrap()
      .catch((e) => console.error(e))
  }
