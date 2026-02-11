import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { itemsApi } from './api'

export function App() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const queryClient = useQueryClient()

  const { data: items = [] } = useQuery({
    queryKey: ['items'],
    queryFn: itemsApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: itemsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      setName('')
      setPrice('')
      setDescription('')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: itemsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const priceNum = parseFloat(price)
    if (!name.trim() || isNaN(priceNum)) return

    createMutation.mutate({
      name: name.trim(),
      price: priceNum,
      description: description.trim(),
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            step="0.01"
            className="w-32 px-4 py-2 border rounded"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {createMutation.isPending ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</p>
                {item.description && (
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                )}
              </div>
              <button
                onClick={() => deleteMutation.mutate(item.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
