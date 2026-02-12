import { StrictMode, useEffect, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App } from './App'
import './index.css'

// Create QueryClient for client-side
// Queries are enabled here, so data will be fetched after hydration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
    },
  },
})

// Wrapper to only show devtools after hydration
function DevtoolsWrapper() {
  const [showDevtools, setShowDevtools] = useState(false)

  useEffect(() => {
    setShowDevtools(true)
  }, [])

  return showDevtools ? <ReactQueryDevtools /> : null
}

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <DevtoolsWrapper />
    </QueryClientProvider>
  </StrictMode>
)
