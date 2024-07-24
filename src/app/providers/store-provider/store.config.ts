import { appApi } from '@/entities/app/api'
import { printerApi } from '@/entities/printer/api'

import { combineSlices, configureStore } from '@reduxjs/toolkit'
//import appSlice from '@/entities/app/model/app.slice'
/* import { userApi } from '@/entities/user/api/user.api'
import { userReducer } from '@/entities/user'*/

export const rootReducer = combineSlices({
  //combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [printerApi.reducerPath]: printerApi.reducer,
  //[printerSlice.name]: printerSlice.reducer,
  //[appSlice.name]: appSlice.reducer,
  /*   userReducer,
  [userApi.reducerPath]: userApi.reducer*/
})

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
      serializableCheck: false,
    }).concat([appApi.middleware, printerApi.middleware])
  },
})
