import axios from 'axios'

export interface Item {
  id: number
  name: string
  price: number
  description: string
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const itemsApi = {
  getAll: async () => {
    const { data } = await api.get<{ items: Item[] }>('/items')
    return data.items
  },

  getById: async (id: number) => {
    const { data } = await api.get<{ item: Item }>(`/items/${id}`)
    return data.item
  },

  create: async (item: { name: string; price: number; description?: string }) => {
    const { data } = await api.post<{ item: Item }>('/items', item)
    return data.item
  },

  delete: async (id: number) => {
    await api.delete(`/items/${id}`)
  },
}
