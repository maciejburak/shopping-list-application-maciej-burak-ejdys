import { useNavigate } from "react-router-dom";
import { useItemDetails } from "./useItemDetails";
import { IconButton } from "../../components/IconButton/IconButton";
import { BackIcon } from "../../components/icons";
import * as S from "./ItemDetailsPage.styles";

export function ItemDetailsPage() {
  const navigate = useNavigate();
  const { item, isLoading, error } = useItemDetails();

  if (isLoading) {
    return (
      <div className="page-container">
        <S.Loading>Loading...</S.Loading>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="page-container">
        <S.Error>Item not found</S.Error>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingBottom: '60px' }}>
      <S.Header>
        <IconButton
          onClick={() => navigate("/")}
          className="icon-button"
          aria-label="Back to list"
          style={{ position: 'absolute', left: 0 }}
        >
          <BackIcon />
        </IconButton>

        <S.TitleContainer>
          <h1 className="page-title" style={{ marginBottom: 0 }}>{item.name}</h1>
        </S.TitleContainer>
      </S.Header>

      {item.description && (
        <S.Description>{item.description}</S.Description>
      )}
    </div>
  );
}
