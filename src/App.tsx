import { Routes, Route } from 'react-router-dom'
import { ShoppingListPage } from './pages/ShoppingListPage'
import { ItemDetailsPage } from './pages/ItemDetailsPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingListPage />} />
      <Route path="/items/:id" element={<ItemDetailsPage />} />
    </Routes>
  )
}
