import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { ServerStyleSheet } from 'styled-components'
import { App } from './App'

interface RenderOptions {
  url: string
  queryKey: unknown[]
  data: any
}

export async function render({ url, queryKey, data }: RenderOptions) {
  const sheet = new ServerStyleSheet()

  try {
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
      sheet.collectStyles(
        <StaticRouter location={url}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StaticRouter>
      )
    )

    const styleTags = sheet.getStyleTags()
    const dehydratedState = dehydrate(queryClient)

    return { html, styleTags, dehydratedState }
  } catch (error) {
    console.error('SSR Error:', error)
    throw error
  } finally {
    sheet.seal()
  }
}
