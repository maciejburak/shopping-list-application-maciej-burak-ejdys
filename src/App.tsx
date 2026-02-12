import { Routes, Route } from 'react-router-dom'
import { ShoppingListPage } from './pages/ShoppingListPage'
import { ItemDetailsPage } from './pages/ItemDetailsPage'
import { ItemDialog } from './components/ItemDialog'
import { DialogProvider } from './providers/DialogProvider'

export function App() {
  return (
    <DialogProvider>
      <Routes>
        <Route path="/" element={<ShoppingListPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
      </Routes>
      <ItemDialog />
    </DialogProvider>
  )
}
