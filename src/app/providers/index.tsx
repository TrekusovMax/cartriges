import { ReactNode } from 'react'
import { StoreProvider } from './store-provider/store-provider'

interface IProvidersProps {
  children: ReactNode
}

export const Providers = (props: IProvidersProps) => {
  const { children } = props

  return <StoreProvider>{children}</StoreProvider>
}
