import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  /*FetchBaseQueryMeta */
} from '@reduxjs/toolkit/query/react'
/* import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { localStorageService } from '@/shared/services/localStorage.service'
import { userLogout, userRefresh } from '@/entities/user/model/user.selectors' */

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  prepareHeaders: (headers) => {
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    return headers
  },
})

export const baseQueryWithResult: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  /*const user = localStorageService.getUser()

  if (user && user.expiresAccess < Date.now() && user.expiresRefresh > Date.now()) {
    // eslint-disable-next-line
    const { data }: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> =
      await authBaseQuery(
        {
          url: `token?key=${import.meta.env.VITE_FIREBASE_KEY}`,
          method: 'POST',import { authBaseQuery } from './fetch-base-query-store';

          body: {
            grant_type: 'refresh_token',
            refresh_token: user.refreshToken,
          },
        },
        api,
        extraOptions,
      )

    if (data) {
      api.dispatch(
        userRefresh({
          ...data,
          expiresAccess: Date.now() + 5 * 60 * 1000,
          expiresRefresh: Date.now() + Number(data.expires_in) * 1000,
        }),
      )
    }
  }

  if (user && user.expiresRefresh < Date.now()) {
    api.dispatch(userLogout())
  }
 */
  return await baseQuery(args, api, extraOptions)
}
