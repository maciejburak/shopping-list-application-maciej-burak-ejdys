import { useState, useEffect, useCallback } from 'react'
import { useDialogState, useDialogActions } from '../../../providers/DialogProvider'
import { useItemFromCache } from '../../../providers/ServerStateProvider/selectors'
import { useCreateItem, useUpdateItem } from '../../../providers/ServerStateProvider/mutations'

const EMPTY_FORM = { name: '', price: '', description: '' }

export function useItemDialog() {
  const { isOpen, mode, itemId } = useDialogState()
  const { close } = useDialogActions()
  const [form, setForm] = useState(EMPTY_FORM)

  const item = useItemFromCache(itemId)
  const createMutation = useCreateItem()
  const updateMutation = useUpdateItem()

  const config = mode ? {
    create: {
      initialForm: EMPTY_FORM,
      mutation: createMutation,
      buildParams: (data: any) => data,
      canRender: true,
    },
    edit: {
      initialForm: item ? { name: item.name, price: item.price.toString(), description: item.description } : EMPTY_FORM,
      mutation: updateMutation,
      buildParams: (data: any) => ({ id: itemId!, data }),
      canRender: Boolean(item),
    },
  }[mode] : null

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM)
      return
    }

    if (config) {
      setForm(config.initialForm)
    }
  }, [isOpen, mode, item])

  const updateField = useCallback((field: keyof typeof EMPTY_FORM) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSave = useCallback(() => {
    if (!config) return

    const data = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      description: form.description.trim(),
    }

    config.mutation.mutate(config.buildParams(data), { onSuccess: close })
  }, [form, config, close])

  return {
    shouldRender: isOpen && config?.canRender,
    name: form.name,
    price: form.price,
    description: form.description,
    isPending: config?.mutation.isPending ?? false,
    onNameChange: updateField('name'),
    onPriceChange: updateField('price'),
    onDescriptionChange: updateField('description'),
    onSave: handleSave,
    onClose: close,
  }
}
