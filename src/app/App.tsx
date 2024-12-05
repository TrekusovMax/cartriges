import React from 'react'

import { AppRouter } from './app-router'
import { AppProvider } from './providers/app-provider'
import { AppLoader } from './app-loader'

import '@/shared/config/firebase/firebase-config.js'

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppLoader>
        <AppRouter />
      </AppLoader>
    </AppProvider>
  )
}

export default App
