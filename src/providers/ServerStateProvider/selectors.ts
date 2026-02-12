import { useQuery, useQueryClient } from '@tanstack/react-query'
import { itemsApi, type Item } from '../../api'

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: itemsApi.getAll,
  })
}

export function useItem(id: number) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemsApi.getById(id),
    enabled: !isNaN(id),
  })
}

export function useItemsData() {
  const { data } = useItems()
  return data || []
}

export function useItemFromCache(id: number | null) {
  const queryClient = useQueryClient()
  const items = queryClient.getQueryData<Item[]>(['items']) || []
  return items.find((item) => item.id === id) || null
}
