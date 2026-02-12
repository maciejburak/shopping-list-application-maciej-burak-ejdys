import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'

export type DialogMode = 'create' | 'edit'

interface DialogState {
  isOpen: boolean
  mode: DialogMode
  itemId: number | null
}

interface DialogContextValue {
  state: DialogState
  openForCreate: () => void
  openForEdit: (itemId: number) => void
  close: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    mode: 'create',
    itemId: null,
  })

  const openForCreate = useCallback(() => {
    setState({
      isOpen: true,
      mode: 'create',
      itemId: null,
    })
  }, [])

  const openForEdit = useCallback((itemId: number) => {
    setState({
      isOpen: true,
      mode: 'edit',
      itemId,
    })
  }, [])

  const close = useCallback(() => {
    setState({
      isOpen: false,
      mode: 'create',
      itemId: null,
    })
  }, [])

  const value = useMemo(
    () => ({
      state,
      openForCreate,
      openForEdit,
      close,
    }),
    [state, openForCreate, openForEdit, close]
  )

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

export function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialogContext must be used within DialogProvider')
  }
  return context
}

export function useDialogState() {
  return useDialogContext().state
}

export function useDialogActions() {
  const { openForCreate, openForEdit, close } = useDialogContext()
  return useMemo(
    () => ({ openForCreate, openForEdit, close }),
    [openForCreate, openForEdit, close]
  )
}
