import { useState, useEffect } from 'react'
import { useDialogState, useDialogActions } from '../../providers/DialogProvider'
import { useItemFromCache } from '../../providers/ServerStateProvider/selectors'
import { useCreateItem, useUpdateItem } from '../../providers/ServerStateProvider/mutations'

export function useItemDialog() {
  const { isOpen, mode, itemId } = useDialogState()
  const { close } = useDialogActions()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const item = useItemFromCache(itemId)
  const createMutation = useCreateItem()
  const updateMutation = useUpdateItem()

  useEffect(() => {
    if (isOpen && mode === 'edit' && item) {
      setName(item.name)
      setPrice(item.price.toString())
      setDescription(item.description)
    } else if (isOpen && mode === 'create') {
      setName('')
      setPrice('')
      setDescription('')
    }
  }, [isOpen, mode, item])

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setPrice('')
      setDescription('')
    }
  }, [isOpen])

  const handleSave = () => {
    const priceNum = parseFloat(price)
    if (!name.trim() || isNaN(priceNum)) return

    if (mode === 'create') {
      createMutation.mutate(
        {
          name: name.trim(),
          price: priceNum,
          description: description.trim(),
        },
        {
          onSuccess: () => {
            close()
          },
        }
      )
    } else if (mode === 'edit' && itemId) {
      updateMutation.mutate(
        {
          id: itemId,
          data: {
            name: name.trim(),
            price: priceNum,
            description: description.trim(),
          },
        },
        {
          onSuccess: () => {
            close()
          },
        }
      )
    }
  }

  const shouldRender = isOpen && (mode === 'create' || (mode === 'edit' && item))
  const title = mode === 'create' ? 'Add New Item' : 'Edit Item'
  const saveLabel = mode === 'create' ? 'Add' : 'Save'

  return {
    shouldRender,
    title,
    saveLabel,
    name,
    price,
    description,
    isPending: createMutation.isPending || updateMutation.isPending,
    onNameChange: (value: string) => setName(value),
    onPriceChange: (value: string) => setPrice(value),
    onDescriptionChange: (value: string) => setDescription(value),
    onSave: handleSave,
    onClose: close,
  }
}
