const API_BASE_URL = 'http://localhost:3000/api'

export interface Item {
  id: number
  name: string
  price: number
  description: string
}

interface RequestOptions {
  endpoint: string
  errorMessage: string
  allowNotFound?: boolean
}

export async function GET<T>(options: RequestOptions): Promise<T | null> {
  const { endpoint, errorMessage, allowNotFound = false } = options

  try {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url)

    if (response.status === 404 && allowNotFound) {
      return null
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error(`❌ ${errorMessage}:`, error)
    throw error
  }
}

export async function getItems(): Promise<Item[]> {
  const response = await GET<{ items: Item[] }>({
    endpoint: '/items',
    errorMessage: 'Failed to get items',
  })

  const items = response?.items || []
  console.log(`📦 Got ${items.length} items from API`)
  return items
}

export async function getItemById(id: number): Promise<Item | null> {
  const response = await GET<{ item: Item }>({
    endpoint: `/items/${id}`,
    errorMessage: `Failed to get item ${id}`,
    allowNotFound: true,
  })

  if (response) {
    console.log(`📦 Got item ${id} for SSR`)
    return response.item
  }

  return null
}
