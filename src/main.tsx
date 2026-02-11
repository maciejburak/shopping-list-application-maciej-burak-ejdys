import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createQueryClient } from './lib/query-client'
import { App } from './App'
import './index.css'

const queryClient = createQueryClient()
const dehydratedState = window.__REACT_QUERY_STATE__

console.log('🎯 Hydrating React with server-rendered HTML')

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <App />
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
