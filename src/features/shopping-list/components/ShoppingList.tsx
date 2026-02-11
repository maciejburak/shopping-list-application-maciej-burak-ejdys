import { useState } from 'react'
import {
  useShoppingItems,
  useCreateShoppingItem,
  useDeleteShoppingItem,
} from '../api/shopping-list.queries'
import type { CreateShoppingItemDTO } from '../types/shopping-list.types'

export function ShoppingList() {
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')

  // Dane są już w cache React Query z serwera!
  const { data: items = [], isLoading, error } = useShoppingItems()
  const createItem = useCreateShoppingItem()
  const deleteItem = useDeleteShoppingItem()

  console.log('📦 Items from React Query cache:', items)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim() || !newItemPrice) return

    const price = parseFloat(newItemPrice)
    if (isNaN(price) || price < 0) return

    const dto: CreateShoppingItemDTO = {
      name: newItemName.trim(),
      price,
      description: newItemDescription.trim(),
    }

    createItem.mutate(dto, {
      onSuccess: () => {
        setNewItemName('')
        setNewItemPrice('')
        setNewItemDescription('')
      },
    })
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading shopping list...</div>
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading shopping list: {error.message}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>
      <p className="mb-4 text-sm text-gray-600">
        ✅ Loaded from server cache (no client fetch needed!)
      </p>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name..."
            className="flex-1 px-4 py-2 border rounded"
            required
          />
          <input
            type="number"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            placeholder="Price"
            min="0"
            step="0.01"
            className="w-32 px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Description (optional)..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={createItem.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {createItem.isPending ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </form>

      {/* Items List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items yet. Add your first item!</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-xl font-bold text-green-600 mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteItem.mutate(item.id)}
                  disabled={deleteItem.isPending}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
