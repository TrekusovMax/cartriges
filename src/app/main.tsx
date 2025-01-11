import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import '@ant-design/v5-patch-for-react-19'
import { queryClient } from '@/shared/api/query-client'
import { Loader } from '@/shared/ui/loader'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries()
        })
      }}>
      <Loader>
        <App />
      </Loader>
    </PersistQueryClientProvider>
  </React.StrictMode>,
)
