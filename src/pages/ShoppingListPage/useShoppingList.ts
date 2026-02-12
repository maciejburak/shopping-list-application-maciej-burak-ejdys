import { useDialogActions } from '../../providers/DialogProvider'
import { useDeleteItem } from '../../providers/ServerStateProvider/mutations'
import { useItems } from '../../providers/ServerStateProvider/selectors'

export function useShoppingList() {
  const { openForCreate, openForEdit } = useDialogActions()
  const { data: items = [], isLoading } = useItems()
  const deleteMutation = useDeleteItem()

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleEdit = (id: number) => {
    openForEdit(id)
  }

  return {
    items,
    isLoading,
    onAddNew: openForCreate,
    onEdit: handleEdit,
    onDelete: handleDelete,
  }
}
