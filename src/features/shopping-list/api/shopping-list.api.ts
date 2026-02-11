import { apiClient } from '@/lib/api-client'
import type {
  ShoppingItem,
  CreateShoppingItemDTO,
  UpdateShoppingItemDTO,
  ShoppingListFilters,
} from '../types/shopping-list.types'

/**
 * Shopping List API Layer
 * Pure API calls without React/TanStack Query dependencies
 * Can be used anywhere (server, client, tests)
 */

export const shoppingListApi = {
  /**
   * Fetch all shopping items
   */
  async getItems(filters?: ShoppingListFilters): Promise<ShoppingItem[]> {
    const { data } = await apiClient.get<ShoppingItem[]>('/shopping-items', {
      params: filters,
    })
    return data
  },

  /**
   * Fetch single item by ID
   */
  async getItem(id: string): Promise<ShoppingItem> {
    const { data } = await apiClient.get<ShoppingItem>(`/shopping-items/${id}`)
    return data
  },

  /**
   * Create new shopping item
   */
  async createItem(dto: CreateShoppingItemDTO): Promise<ShoppingItem> {
    const { data } = await apiClient.post<ShoppingItem>('/shopping-items', dto)
    return data
  },

  /**
   * Update existing item
   */
  async updateItem(id: string, dto: UpdateShoppingItemDTO): Promise<ShoppingItem> {
    const { data } = await apiClient.patch<ShoppingItem>(`/shopping-items/${id}`, dto)
    return data
  },

  /**
   * Delete item
   */
  async deleteItem(id: string): Promise<void> {
    await apiClient.delete(`/shopping-items/${id}`)
  },

  /**
   * Toggle item checked status
   */
  async toggleItem(id: string): Promise<ShoppingItem> {
    const { data } = await apiClient.patch<ShoppingItem>(`/shopping-items/${id}/toggle`)
    return data
  },
}
