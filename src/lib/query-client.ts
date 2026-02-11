import { QueryClient } from '@tanstack/react-query'

/**
 * Factory function for creating QueryClient instances
 * Separate instances for server/client to avoid state leakage
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes (was cacheTime)
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

// Client-side singleton
let clientQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create new instance
    return createQueryClient()
  }

  // Client: create singleton
  if (!clientQueryClient) {
    clientQueryClient = createQueryClient()
  }
  return clientQueryClient
}
