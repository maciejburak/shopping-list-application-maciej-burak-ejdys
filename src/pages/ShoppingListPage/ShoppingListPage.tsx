import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useShoppingList } from './useShoppingList'

export const ShoppingListPage = memo(function ShoppingListPage() {
  const { items, isLoading, onAddNew, onEdit, onDelete } = useShoppingList()

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <button
          onClick={onAddNew}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add New Item
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
          <div key={item.id} className="p-4 border rounded bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <Link
                  to={`/items/${item.id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {item.name}
                </Link>
                <p className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</p>
                {item.description && (
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item.id)}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
