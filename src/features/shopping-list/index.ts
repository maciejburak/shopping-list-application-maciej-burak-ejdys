/**
 * Shopping List Feature - Public API
 * Only export what's needed outside this feature
 */

// Components
export { ShoppingList } from './components/ShoppingList'

// Hooks (if needed outside)
export {
  useShoppingItems,
  useCreateShoppingItem,
  useUpdateShoppingItem,
  useDeleteShoppingItem,
  useToggleShoppingItem,
  shoppingListKeys,
} from './api/shopping-list.queries'

// Types (if needed outside)
export type {
  ShoppingItem,
  CreateShoppingItemDTO,
  UpdateShoppingItemDTO,
  ShoppingListFilters,
} from './types/shopping-list.types'
