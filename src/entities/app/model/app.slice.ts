/*import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HeaderMenuItem } from './app.types'

interface App {
  headerMenu: HeaderMenuItem[]
}

const initialState: App = {
  headerMenu: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getHeaderMenuItems(state, action: PayloadAction<HeaderMenuItem>) {
      state.headerMenu.push(action.payload)
    },
     addElement(state, action: PayloadAction<SiteElement>) {
      state.elements.push(action.payload)
    },
    deleteElement(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter((item) => item.id !== action.payload)
    },
    changeElementWidth(state, action: PayloadAction<{ id: string; change: number }>) {
      console.log('change', action.payload)
      state.elements = state.elements.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              width:
                item.width + action.payload.change < 0 ? 20 : item.width + action.payload.change,
            }
          : item,
      )
    },
    changeElementHeight(state, action: PayloadAction<{ id: string; change: number }>) {
      console.log('change', action.payload)
      state.elements = state.elements.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              height:
                item.height + action.payload.change < 0 ? 20 : item.height + action.payload.change,
            }
          : item,
      )
    }, 
  },
})

export default appSlice*/
