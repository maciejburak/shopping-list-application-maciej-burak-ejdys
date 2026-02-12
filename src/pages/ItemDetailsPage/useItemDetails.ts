import { useParams } from 'react-router-dom'
import { useItem } from '../../providers/ServerStateProvider/selectors'

export function useItemDetails() {
  const { id } = useParams<{ id: string }>()

  const itemId = parseInt(id!, 10)

  const { data: item, isLoading, error } = useItem(itemId)

  return {
    item,
    isLoading,
    error,
  }
}
