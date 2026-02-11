import { useState } from 'react'
import {
  useShoppingItems,
  useCreateShoppingItem,
  useDeleteShoppingItem,
  useToggleShoppingItem,
} from '../api/shopping-list.queries'
import type { CreateShoppingItemDTO } from '../types/shopping-list.types'

export function ShoppingList() {
  const [newItemName, setNewItemName] = useState('')
  const [newItemQuantity, setNewItemQuantity] = useState(1)

  // 🎯 Fancy TanStack Query hooks in action!
  const { data: items = [], isLoading, error } = useShoppingItems()
  const createItem = useCreateShoppingItem()
  const deleteItem = useDeleteShoppingItem()
  const toggleItem = useToggleShoppingItem()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newItemName.trim()) return

    const dto: CreateShoppingItemDTO = {
      name: newItemName.trim(),
      quantity: newItemQuantity,
    }

    createItem.mutate(dto, {
      onSuccess: () => {
        setNewItemName('')
        setNewItemQuantity(1)
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
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item name..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <input
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(Number(e.target.value))}
          min="1"
          className="w-20 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={createItem.isPending}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {createItem.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Items List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items yet. Add your first item!</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem.mutate(item.id)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <span className={item.checked ? 'line-through text-gray-500' : ''}>
                  {item.name}
                </span>
                <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
              </div>
              <button
                onClick={() => deleteItem.mutate(item.id)}
                disabled={deleteItem.isPending}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
