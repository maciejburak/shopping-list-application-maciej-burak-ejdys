import { createContext, type ReactNode } from "react"
import type { DialogContextValue } from "./types"
import { useDialogValue } from "./useDialogValue"

export const DialogContext = createContext<DialogContextValue | null>(null)

export function DialogProvider({ children }: { children: ReactNode }) {
  const value = useDialogValue()

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  )
}
