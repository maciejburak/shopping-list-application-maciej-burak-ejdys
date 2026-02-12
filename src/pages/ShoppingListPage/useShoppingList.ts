import { useDialogActions } from '../../providers/DialogProvider'
import { useDeleteItem } from '../../providers/ServerStateProvider/mutations'
import { useItemsData } from '../../providers/ServerStateProvider/selectors'

export function useShoppingList() {
  const { openForCreate, openForEdit } = useDialogActions()
  const items = useItemsData()
  const deleteMutation = useDeleteItem()

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleEdit = (id: number) => {
    openForEdit(id)
  }

  return {
    items,
    onAddNew: openForCreate,
    onEdit: handleEdit,
    onDelete: handleDelete,
  }
}
