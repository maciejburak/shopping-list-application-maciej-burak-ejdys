import { Link } from "react-router-dom";
import { IconButton } from "../IconButton/IconButton";
import { EditIcon, DeleteIcon } from "../icons";

interface ShoppingListItemProps {
  id: number;
  name: string;
  price: number;
  index: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  styles: Record<string, string>;
}

export function ShoppingListItem({
  id,
  name,
  price,
  index,
  onEdit,
  onDelete,
  styles,
}: ShoppingListItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.itemNumber}>{index + 1}</div>

      <div className={styles.itemContent}>
        <Link to={`/items/${id}`} className={styles.itemName}>
          {name}
        </Link>
        <span className={styles.itemPrice}>{price} NIS</span>
      </div>

      <div className={styles.itemActions}>
        <IconButton
          onClick={() => onEdit(id)}
          className={`icon-button ${styles.iconButton}`}
          aria-label="Edit item"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => onDelete(id)}
          className={`icon-button ${styles.iconButton}`}
          aria-label="Delete item"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
