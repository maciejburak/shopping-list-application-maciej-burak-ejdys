import axios from 'axios'
import { z } from 'zod'

const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
})

const ItemsResponseSchema = z.object({
  items: z.array(ItemSchema),
})

const ItemResponseSchema = z.object({
  item: ItemSchema,
})

export type Item = z.infer<typeof ItemSchema>

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const itemsApi = {
  getAll: async () => {
    const { data } = await api.get('/items')
    const validated = ItemsResponseSchema.parse(data)
    return validated.items
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/items/${id}`)
    const validated = ItemResponseSchema.parse(data)
    return validated.item
  },

  create: async (item: { name: string; price: number; description?: string }) => {
    const { data } = await api.post('/items', item)
    const validated = ItemResponseSchema.parse(data)
    return validated.item
  },

  update: async (id: number, item: { name: string; price: number; description?: string }) => {
    const { data } = await api.put(`/items/${id}`, item)
    const validated = ItemResponseSchema.parse(data)
    return validated.item
  },

  delete: async (id: number) => {
    await api.delete(`/items/${id}`)
  },
}
