import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'
import type { Item } from './api'

export async function render(url: string, initialData: Item[] | Item | null) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false,
      },
    },
  })

  // Populate cache based on route
  if (url === '/') {
    // Homepage: set items list
    queryClient.setQueryData(['items'], initialData || [])
  } else if (url.match(/^\/items\/\d+$/)) {
    // Item details: set single item
    const id = parseInt(url.split('/')[2], 10)
    queryClient.setQueryData(['item', id], initialData)
  }

  const html = renderToString(
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StaticRouter>
  )

  return { html }
}
