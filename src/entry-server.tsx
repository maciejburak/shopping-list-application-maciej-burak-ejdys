import { renderToString } from 'react-dom/server'
import { QueryClientProvider, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { createQueryClient } from './lib/query-client'
import { App } from './App'

/**
 * Server-side entry point
 * Renders React to HTML string with prefetched data
 */

export async function render() {
  // Create fresh QueryClient for each request (prevent state leakage)
  const queryClient = createQueryClient()

  // Prefetch data here if needed
  // Example:
  // await queryClient.prefetchQuery({
  //   queryKey: shoppingListKeys.list(),
  //   queryFn: () => shoppingListApi.getItems(),
  // })

  // Render app to HTML
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <App />
      </HydrationBoundary>
    </QueryClientProvider>
  )

  // Dehydrate state to send to client
  const dehydratedState = dehydrate(queryClient)

  return { html, dehydratedState }
}
