import { memo } from "react";
import { useItemDialog } from "./useItemDialog";
import { IconButton } from "../../common/IconButton/IconButton";
import { CloseIcon, SendIcon } from "../../icons";
import * as S from "./ItemDialog.styles";

export const ItemDialog = memo(function ItemDialog() {
  const {
    shouldRender,
    name,
    price,
    description,
    isPending,
    onNameChange,
    onPriceChange,
    onDescriptionChange,
    onSave,
    onClose,
  } = useItemDialog();

  if (!shouldRender) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Dialog onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <IconButton
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              position: 'absolute',
              right: '8px',
              top: '30px',
              transform: 'translateY(-50%)'
            }}
          >
            <CloseIcon />
          </IconButton>
        </S.Header>

        <S.Content>
          <S.Form>
            <S.Row>
              <S.Field style={{ flex: 1 }}>
                <S.Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Name"
                  autoFocus
                />
              </S.Field>

              <S.Field style={{ flex: 1 }}>
                <S.Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => onPriceChange(e.target.value)}
                  step="0.01"
                  placeholder="Price"
                />
              </S.Field>
            </S.Row>

            <S.Field>
              <S.Textarea
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Description"
              />
            </S.Field>
          </S.Form>
        </S.Content>

        <S.Footer>
          <S.SubmitButton
            onClick={onSave}
            disabled={isPending}
            aria-label="Save item"
          >
            <SendIcon />
          </S.SubmitButton>
        </S.Footer>
      </S.Dialog>
    </S.Overlay>
  );
});
