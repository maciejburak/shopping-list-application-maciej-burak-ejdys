/**
 * Shopping List Domain Types
 * Single source of truth for the shopping list feature
 */

export interface ShoppingItem {
  id: string
  name: string
  quantity: number
  checked: boolean
  category?: string
  createdAt: string
  updatedAt: string
}

export interface CreateShoppingItemDTO {
  name: string
  quantity: number
  category?: string
}

export interface UpdateShoppingItemDTO {
  name?: string
  quantity?: number
  checked?: boolean
  category?: string
}

export interface ShoppingListFilters {
  search?: string
  category?: string
  checked?: boolean
}
