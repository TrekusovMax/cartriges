import { rootReducer } from '@/app/providers/store-provider/store.config'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RcFile } from 'antd/es/upload'

interface IFile {
  fileUpload: File | null
}

const initialState: IFile = {
  fileUpload: null,
}

export const printerSlice = createSlice({
  name: 'printer',
  initialState,
  //extraReducers: (builder) => {},
  reducers: {
    uploadFile: (state, action: PayloadAction<RcFile>) => {
      state.fileUpload = action.payload
    },
    fileRemove: (state) => {
      state.fileUpload = null
    },
  },
  selectors: {
    getImageLoaded: (state) => state.fileUpload,
  },
}).injectInto(rootReducer)

export const { uploadFile, fileRemove } = printerSlice.actions
export const { getImageLoaded } = printerSlice.selectors
