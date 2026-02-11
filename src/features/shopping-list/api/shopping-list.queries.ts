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
  ShoppingListFilters,
} from '../types/shopping-list.types'

/**
 * 🚀 FANCY PATTERN: Query Keys Factory
 * Centralized, type-safe query key management
 * Prevents typos and makes invalidation easy
 */
export const shoppingListKeys = {
  all: ['shopping-list'] as const,
  lists: () => [...shoppingListKeys.all, 'list'] as const,
  list: (filters?: ShoppingListFilters) => [...shoppingListKeys.lists(), { filters }] as const,
  details: () => [...shoppingListKeys.all, 'detail'] as const,
  detail: (id: string) => [...shoppingListKeys.details(), id] as const,
}

/**
 * 🎯 Custom Hook: useShoppingItems
 * Encapsulates the query logic for fetching shopping items
 */
export function useShoppingItems(
  filters?: ShoppingListFilters,
  options?: Omit<UseQueryOptions<ShoppingItem[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: shoppingListKeys.list(filters),
    queryFn: () => shoppingListApi.getItems(filters),
    ...options,
  })
}

/**
 * 🎯 Custom Hook: useShoppingItem
 * Fetch single item by ID
 */
export function useShoppingItem(
  id: string,
  options?: Omit<UseQueryOptions<ShoppingItem>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: shoppingListKeys.detail(id),
    queryFn: () => shoppingListApi.getItem(id),
    enabled: !!id,
    ...options,
  })
}

/**
 * 🚀 Custom Hook: useCreateShoppingItem
 * Optimistic update + automatic cache invalidation
 */
export function useCreateShoppingItem(
  options?: UseMutationOptions<ShoppingItem, Error, CreateShoppingItemDTO>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: shoppingListApi.createItem,
    onMutate: async (newItem): Promise<{ previousItems?: ShoppingItem[] }> => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: shoppingListKeys.lists() })

      // Snapshot previous value
      const previousItems = queryClient.getQueryData<ShoppingItem[]>(shoppingListKeys.list())

      // Optimistically update
      if (previousItems) {
        queryClient.setQueryData<ShoppingItem[]>(shoppingListKeys.list(), (old = []) => [
          ...old,
          {
            id: `temp-${Date.now()}`,
            ...newItem,
            checked: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as ShoppingItem,
        ])
      }

      return { previousItems }
    },
    onError: (_err, _newItem, context) => {
      // Rollback on error
      if (context?.previousItems) {
        queryClient.setQueryData(shoppingListKeys.list(), context.previousItems)
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}

/**
 * 🚀 Custom Hook: useUpdateShoppingItem
 */
export function useUpdateShoppingItem(
  options?: UseMutationOptions<ShoppingItem, Error, { id: string; dto: UpdateShoppingItemDTO }>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }) => shoppingListApi.updateItem(id, dto),
    onMutate: async ({ id, dto }): Promise<{ previousItem?: ShoppingItem }> => {
      await queryClient.cancelQueries({ queryKey: shoppingListKeys.detail(id) })

      const previousItem = queryClient.getQueryData<ShoppingItem>(shoppingListKeys.detail(id))

      // Optimistic update
      if (previousItem) {
        queryClient.setQueryData<ShoppingItem>(shoppingListKeys.detail(id), {
          ...previousItem,
          ...dto,
          updatedAt: new Date().toISOString(),
        })
      }

      return { previousItem }
    },
    onError: (_err, { id }, context) => {
      if (context?.previousItem) {
        queryClient.setQueryData(shoppingListKeys.detail(id), context.previousItem)
      }
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}

/**
 * 🚀 Custom Hook: useDeleteShoppingItem
 */
export function useDeleteShoppingItem(
  options?: UseMutationOptions<void, Error, string>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: shoppingListApi.deleteItem,
    onMutate: async (id): Promise<{ previousItems?: ShoppingItem[] }> => {
      await queryClient.cancelQueries({ queryKey: shoppingListKeys.lists() })

      const previousItems = queryClient.getQueryData<ShoppingItem[]>(shoppingListKeys.list())

      // Optimistic delete
      if (previousItems) {
        queryClient.setQueryData<ShoppingItem[]>(
          shoppingListKeys.list(),
          previousItems.filter((item) => item.id !== id)
        )
      }

      return { previousItems }
    },
    onError: (_err, _id, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(shoppingListKeys.list(), context.previousItems)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}

/**
 * 🎯 Custom Hook: useToggleShoppingItem
 * Quick toggle for checked status
 */
export function useToggleShoppingItem(
  options?: UseMutationOptions<ShoppingItem, Error, string>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: shoppingListApi.toggleItem,
    onMutate: async (id): Promise<{ previousItems?: ShoppingItem[] }> => {
      await queryClient.cancelQueries({ queryKey: shoppingListKeys.lists() })

      const previousItems = queryClient.getQueryData<ShoppingItem[]>(shoppingListKeys.list())

      // Optimistic toggle
      if (previousItems) {
        queryClient.setQueryData<ShoppingItem[]>(
          shoppingListKeys.list(),
          previousItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        )
      }

      return { previousItems }
    },
    onError: (_err, _id, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(shoppingListKeys.list(), context.previousItems)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
    ...options,
  })
}
