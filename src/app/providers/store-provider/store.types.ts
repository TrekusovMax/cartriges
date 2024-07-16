//import { IUserState } from '@/entities/user'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { setupStore } from './store.config'

/* export interface IStateSchema {
  user: IUserState
}
 */
export type RootState = ReturnType<typeof setupStore.getState>
export type AppDispatch = typeof setupStore.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof setupStore>()
