//import { IUserState } from '@/entities/user'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { setupStore } from './store.config'
import { createAsyncThunk, ThunkAction, UnknownAction } from '@reduxjs/toolkit'

/* export interface IStateSchema {
  user: IUserState
}
 */

export type AppDispatch = typeof setupStore.dispatch
export type RootState = any //ReturnType<typeof setupStore.getState>
export type AppThunk<R = void> = ThunkAction<
  R,
  RootState,
  unknown /* typeof extraArgument */,
  UnknownAction
>

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof setupStore>()
export const createAsycnThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
