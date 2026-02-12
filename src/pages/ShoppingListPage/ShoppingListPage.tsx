import { memo } from "react";
import { useShoppingList } from "./useShoppingList";
import { ShoppingListItem } from "../../components/ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingListPage.module.css";

export const ShoppingListPage = memo(function ShoppingListPage() {
  const { items, onAddNew, onEdit, onDelete } = useShoppingList();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h1 className="page-title">Shopping List</h1>

      <div className={styles.list}>
        {items.map((item, index) => (
          <ShoppingListItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            styles={styles}
          />
        ))}
      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>Total :</span>
        <span className={styles.totalValue}>{total} NIS</span>
      </div>

      <button onClick={onAddNew} className={styles.addButton}>
        <span style={{ fontSize: '20px', fontWeight: 600 }}>+</span>
        <span>Add Product</span>
      </button>
    </div>
  );
});
