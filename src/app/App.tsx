import React from 'react'

import { Providers } from './providers'
import { RoutesProvider } from './providers/routes-provider'
import '@/shared/config/firebase/firebase.js'

const App: React.FC = () => {
  return (
    <Providers>
      <RoutesProvider />
    </Providers>
  )
}

export default App
