import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { itemsApi } from '../api'

export function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const itemId = parseInt(id!, 10)

  const { data: item, isLoading, error } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => itemsApi.getById(itemId),
    enabled: !isNaN(itemId),
  })

  const deleteMutation = useMutation({
    mutationFn: itemsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      navigate('/')
    },
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to list
        </Link>
        <div>Loading...</div>
      </div>
    )
  }

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
            onClick={() => deleteMutation.mutate(item.id)}
            disabled={deleteMutation.isPending}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Item'}
          </button>
        </div>
      </div>
    </div>
  )
}
