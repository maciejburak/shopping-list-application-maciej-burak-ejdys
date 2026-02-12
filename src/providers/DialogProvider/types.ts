export type DialogMode = "create" | "edit"

export interface DialogState {
  isOpen: boolean
  mode: DialogMode | null
  itemId: number | null
}

export interface DialogContextValue {
  state: DialogState
  openForCreate: () => void
  openForEdit: (itemId: number) => void
  close: () => void
}
