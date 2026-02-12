import { Link } from 'react-router-dom'
import { useItemDetails } from './useItemDetails'

export function ItemDetailsPage() {
  const { item, error, isPending, onDelete } = useItemDetails()

  if (error || !item) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to list
        </Link>
        <div className="text-red-600">Item not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to list
      </Link>

      <div className="bg-white border rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{item.name}</h1>

        <p className="text-3xl font-bold text-green-600 mb-6">
          ${item.price.toFixed(2)}
        </p>

        {item.description && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onDelete}
            disabled={isPending}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isPending ? 'Deleting...' : 'Delete Item'}
          </button>
        </div>
      </div>
    </div>
  )
}
