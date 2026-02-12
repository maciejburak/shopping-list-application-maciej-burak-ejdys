import { memo } from "react";
import { Link } from "react-router-dom";
import { useShoppingList } from "./useShoppingList";
import { IconButton } from "../../components/IconButton/IconButton";
import { EditIcon, DeleteIcon } from "../../components/icons";
import * as S from "./ShoppingListPage.styles";

export const ShoppingListPage = memo(function ShoppingListPage() {
  const { items, onAddNew, onEdit, onDelete } = useShoppingList();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h1 className="page-title">Shopping List</h1>

      <S.List>
        {items.map((item, index) => (
          <S.Item key={item.id}>
            <S.ItemNumber>{index + 1}</S.ItemNumber>

            <S.ItemContent>
              <S.ItemName as={Link} to={`/items/${item.id}`}>
                {item.name}
              </S.ItemName>
              <S.ItemPrice>{item.price} NIS</S.ItemPrice>
            </S.ItemContent>

            <S.ItemActions>
              <IconButton
                onClick={() => onEdit(item.id)}
                className="icon-button"
                aria-label="Edit item"
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => onDelete(item.id)}
                className="icon-button"
                aria-label="Delete item"
              >
                <DeleteIcon />
              </IconButton>
            </S.ItemActions>
          </S.Item>
        ))}
      </S.List>

      <S.Total>
        <S.TotalLabel>Total :</S.TotalLabel>
        <S.TotalValue>{total} NIS</S.TotalValue>
      </S.Total>

      <S.AddButton onClick={onAddNew}>
        <span style={{ fontSize: '20px', fontWeight: 600 }}>+</span>
        <span>Add Product</span>
      </S.AddButton>
    </div>
  );
});
