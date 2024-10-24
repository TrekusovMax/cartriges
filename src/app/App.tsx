import React from 'react'

import { Providers } from './providers'

import '@/shared/config/firebase/firebase-config.js'
import { RouterProvider } from 'react-router-dom'
import { router } from './providers/routes-provider/router'
import { Loader } from '@/shared/ui/loader'

const App: React.FC = () => {
  return (
    <Providers>
      <RouterProvider fallbackElement={<Loader />} router={router} />
    </Providers>
  )
}

export default App
