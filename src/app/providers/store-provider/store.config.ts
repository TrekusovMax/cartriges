import { appApi } from '@/entities/app/api/app.api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
//import appSlice from '@/entities/app/model/app.slice'
/* import { userApi } from '@/entities/user/api/user.api'
import { userReducer } from '@/entities/user'*/

export const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  //[appSlice.name]: appSlice.reducer,
  /*   userReducer,
  [userApi.reducerPath]: userApi.reducer*/
})

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(appApi.middleware)
  },
})
