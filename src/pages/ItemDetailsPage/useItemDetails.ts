import { useParams, useNavigate } from 'react-router-dom'
import { useDeleteItem } from '../../providers/ServerStateProvider/mutations'
import { useItem } from '../../providers/ServerStateProvider/selectors'

export function useItemDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const itemId = parseInt(id!, 10)

  const { data: item, isLoading, error } = useItem(itemId)
  const deleteMutation = useDeleteItem()

  const handleDelete = () => {
    deleteMutation.mutate(itemId, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  return {
    item,
    isLoading,
    error,
    isPending: deleteMutation.isPending,
    onDelete: handleDelete,
  }
}
