import { Routes, Route } from 'react-router-dom'
import { ShoppingListPage } from './pages/ShoppingListPage'
import { ItemDetailsPage } from './pages/ItemDetailsPage'
import { ItemDialog } from './components/ItemDialog'
import { DialogProvider } from './providers/DialogProvider'
import { MobileContainer } from './components/MobileContainer'
import { GlobalStyles } from './styles/GlobalStyles'

export function App() {
  return (
    <>
      <GlobalStyles />
      <DialogProvider>
        <MobileContainer>
          <Routes>
            <Route path="/" element={<ShoppingListPage />} />
            <Route path="/items/:id" element={<ItemDetailsPage />} />
          </Routes>
          <ItemDialog />
        </MobileContainer>
      </DialogProvider>
    </>
  )
}
