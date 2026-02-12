import { memo } from "react";
import { useItemDialog } from "./useItemDialog";
import { IconButton } from "../IconButton/IconButton";
import { CloseIcon, SendIcon } from "../icons";
import styles from "./ItemDialog.module.css";

export const ItemDialog = memo(function ItemDialog() {
  const {
    shouldRender,
    title,
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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <IconButton
            onClick={onClose}
            className={`icon-button ${styles.closeButton}`}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className={styles.content}>
          <div className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field} style={{ flex: 1 }}>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  className={styles.input}
                  placeholder="Name"
                  autoFocus
                />
              </div>

              <div className={styles.field} style={{ flex: 1 }}>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => onPriceChange(e.target.value)}
                  step="0.01"
                  className={styles.input}
                  placeholder="Price"
                />
              </div>
            </div>

            <div className={styles.field}>
              <textarea
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                className={styles.textarea}
                placeholder="Description"
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            onClick={onSave}
            disabled={isPending}
            className={styles.submitButton}
            aria-label="Save item"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
});
