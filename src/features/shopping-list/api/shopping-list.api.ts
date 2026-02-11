import { apiClient } from '@/lib/api-client'
import type {
  ShoppingItem,
  CreateShoppingItemDTO,
  UpdateShoppingItemDTO,
} from '../types/shopping-list.types'

export const shoppingListApi = {
  async getItems(): Promise<ShoppingItem[]> {
    const { data } = await apiClient.get<{ items: ShoppingItem[] }>('/items')
    return data.items
  },

  async getItem(id: number): Promise<ShoppingItem> {
    const { data } = await apiClient.get<{ item: ShoppingItem }>(`/items/${id}`)
    return data.item
  },

  async createItem(dto: CreateShoppingItemDTO): Promise<ShoppingItem> {
    const { data } = await apiClient.post<{ item: ShoppingItem }>('/items', dto)
    return data.item
  },

  async updateItem(id: number, dto: UpdateShoppingItemDTO): Promise<ShoppingItem> {
    const { data } = await apiClient.put<{ item: ShoppingItem }>(`/items/${id}`, dto)
    return data.item
  },

  async deleteItem(id: number): Promise<void> {
    await apiClient.delete(`/items/${id}`)
  },
}
