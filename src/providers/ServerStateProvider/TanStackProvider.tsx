import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query'

declare global {
  interface Window {
    __PRELOADED_STATE__?: any
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
    },
  },
})

const dehydratedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined

if (dehydratedState) {
  hydrate(queryClient, dehydratedState)
  delete window.__PRELOADED_STATE__
}

interface TanStackProviderProps {
  children: ReactNode
}

export function TanStackProvider({ children }: TanStackProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
