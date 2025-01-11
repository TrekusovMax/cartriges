import React from 'react'
import { AppRouter } from './app-router'
import { AppProvider } from './providers/app-provider'

import '@/shared/config/firebase/firebase-config.js'

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
