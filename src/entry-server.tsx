import { renderToString } from 'react-dom/server'
import { QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { createQueryClient } from './lib/query-client'
import { App } from './App'
import { shoppingListKeys } from './features/shopping-list'
import type { ShoppingItem } from './features/shopping-list'

export async function render(items: ShoppingItem[]) {
  // Utwórz nowy QueryClient dla tego requesta
  const queryClient = createQueryClient()

  // Ustaw dane w cache
  queryClient.setQueryData(shoppingListKeys.list(), items)

  // Renderuj React do HTML
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )

  // Przygotuj dehydrated state
  const dehydratedState = dehydrate(queryClient)

  return { html, dehydratedState }
}
