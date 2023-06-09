import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState
  const apiUrl = state.globalConfig.apiUrl
  const token = state.globalConfig.token

  // gracefully handle scenarios where data to generate the URL is missing
  if (!apiUrl) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No apiUrl present',
      },
    }
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: async headers => {
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  })

  return rawBaseQuery(args, api, extraOptions)
}

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Spell', 'Spells', 'Version'],
  endpoints: () => ({}),
})
