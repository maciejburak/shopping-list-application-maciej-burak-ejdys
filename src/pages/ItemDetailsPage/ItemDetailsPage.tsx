import { useNavigate } from "react-router-dom";
import { useItemDetails } from "./useItemDetails";
import { IconButton } from "../../components/IconButton/IconButton";
import { BackIcon } from "../../components/icons";
import styles from "./ItemDetailsPage.module.css";

export function ItemDetailsPage() {
  const navigate = useNavigate();
  const { item, isLoading, error } = useItemDetails();

  if (isLoading) {
    return (
      <div className="page-container">
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="page-container">
        <div className={styles.error}>Item not found</div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingBottom: '60px' }}>
      <div className={styles.header}>
        <IconButton
          onClick={() => navigate("/")}
          className={`icon-button ${styles.backButton}`}
          aria-label="Back to list"
        >
          <BackIcon />
        </IconButton>

        <div className={styles.titleContainer}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>{item.name}</h1>
        </div>
      </div>

      {item.description && (
        <p className={styles.description}>{item.description}</p>
      )}
    </div>
  );
}
