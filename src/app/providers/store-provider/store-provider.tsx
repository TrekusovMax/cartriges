import React from 'react'
import { Provider } from 'react-redux'
import { setupStore } from './store.config'

interface IStoreProviderProps {
  children: React.ReactNode
}

const store = setupStore

export const StoreProvider = (props: IStoreProviderProps) => {
  const { children } = props
  return <Provider store={store}>{children}</Provider>
}
