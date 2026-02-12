import { useState, useCallback, useMemo } from "react"
import type { DialogState, DialogContextValue } from "./types"

const INITIAL_STATE: DialogState = {
  isOpen: false,
  mode: null,
  itemId: null,
}

export function useDialogValue(): DialogContextValue {
  const [state, setState] = useState<DialogState>(INITIAL_STATE)

  const openForCreate = useCallback(() => {
    setState({
      isOpen: true,
      mode: "create",
      itemId: null,
    })
  }, [])

  const openForEdit = useCallback((itemId: number) => {
    setState({
      isOpen: true,
      mode: "edit",
      itemId,
    })
  }, [])

  const close = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return useMemo(
    () => ({
      state,
      openForCreate,
      openForEdit,
      close,
    }),
    [state, openForCreate, openForEdit, close]
  )
}
