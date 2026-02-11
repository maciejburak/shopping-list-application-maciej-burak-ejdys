import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { shoppingListApi } from './shopping-list.api'
import type {
  ShoppingItem,
  CreateShoppingItemDTO,
  UpdateShoppingItemDTO,
} from '../types/shopping-list.types'

export const shoppingListKeys = {
  all: ['shopping-list'] as const,
  lists: () => [...shoppingListKeys.all, 'list'] as const,
  list: () => [...shoppingListKeys.lists()] as const,
  details: () => [...shoppingListKeys.all, 'detail'] as const,
  detail: (id: number) => [...shoppingListKeys.details(), id] as const,
}

export function useShoppingItems(
  options?: Omit<UseQueryOptions<ShoppingItem[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: shoppingListKeys.list(),
    queryFn: () => shoppingListApi.getItems(),
    ...options,
  })
}

export function useShoppingItem(
  id: number,
  options?: Omit<UseQueryOptions<ShoppingItem>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: shoppingListKeys.detail(id),
    queryFn: () => shoppingListApi.getItem(id),
    enabled: !!id,
    ...options,
  })
}

export function useCreateShoppingItem(
  options?: UseMutationOptions<ShoppingItem, Error, CreateShoppingItemDTO>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: shoppingListApi.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}

export function useUpdateShoppingItem(
  options?: UseMutationOptions<ShoppingItem, Error, { id: number; dto: UpdateShoppingItemDTO }>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }) => shoppingListApi.updateItem(id, dto),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}

export function useDeleteShoppingItem(
  options?: UseMutationOptions<void, Error, number>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: shoppingListApi.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}
