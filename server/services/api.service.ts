const API_BASE_URL = 'http://localhost:3000/api'

export interface Item {
  id: number
  name: string
  price: number
  description: string
}

export async function fetchItems(): Promise<Item[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/items`)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const { items } = await response.json()
    console.log(`📦 Fetched ${items.length} items from API`)

    return items
  } catch (error) {
    console.error('❌ Failed to fetch items:', error)
    throw error
  }
}
