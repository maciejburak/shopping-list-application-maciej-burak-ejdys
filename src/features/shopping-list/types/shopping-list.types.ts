export interface ShoppingItem {
  id: number
  name: string
  price: number
  description: string
}

export interface CreateShoppingItemDTO {
  name: string
  price: number
  description?: string
}

export interface UpdateShoppingItemDTO {
  name?: string
  price?: number
  description?: string
}
