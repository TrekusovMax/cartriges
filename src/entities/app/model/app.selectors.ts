/* import { AppDispatch, RootState } from '@/app/providers/store-provider/store.types.ts'
import { HeaderMenuItem } from './app.types'
import appSlice from './app.slice'

const { getHeaderMenuItems } = appSlice.actions

export const setHeaderMenu = (items: HeaderMenuItem) => (dispatch: AppDispatch) => {
  dispatch(getHeaderMenuItems(items))
}

export const deleteSiteElement = (id: string) => (dispatch: AppDispatch) => {
  dispatch(deleteElement(id))
}

export const changeSiteElementWidth = (id: string, change: number) => (dispatch: AppDispatch) => {
  dispatch(changeElementWidth({ id, change }))
}

export const changeSiteElementHeight = (id: string, change: number) => (dispatch: AppDispatch) => {
  dispatch(changeElementHeight({ id, change }))
}

export const getHeaderMenu = (state: RootState) => state.app.headerMenu*/
