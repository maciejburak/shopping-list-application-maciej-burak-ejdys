import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { App } from './App'

interface RenderOptions {
  url: string
  queryKey: unknown[]
  data: any
}

export async function render({ url, queryKey, data }: RenderOptions) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false,
      },
    },
  })

  if (queryKey && data !== undefined) {
    queryClient.setQueryData(queryKey, data)
  }

  const html = renderToString(
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StaticRouter>
  )

  const dehydratedState = dehydrate(queryClient)

  return { html, dehydratedState }
}
