import { useContext, useMemo } from "react"
import { DialogContext } from "./DialogProvider"
import type { DialogState } from "./types"

export function useDialogState(): DialogState {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error("useDialogState must be used within DialogProvider")
  }

  return context.state
}

export function useDialogActions() {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error("useDialogActions must be used within DialogProvider")
  }

  const { openForCreate, openForEdit, close } = context

  return useMemo(
    () => ({ openForCreate, openForEdit, close }),
    [openForCreate, openForEdit, close]
  )
}
