import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './lib/query-client'
import { App } from './App'
import './index.css'

/**
 * Client-side entry point
 * Hydrates the server-rendered HTML
 */

// Get dehydrated state from server
const dehydratedState = window.__REACT_QUERY_STATE__

const queryClient = getQueryClient()

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <App />
      </HydrationBoundary>
    </QueryClientProvider>
  </StrictMode>
)
