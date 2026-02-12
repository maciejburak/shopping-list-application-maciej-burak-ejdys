import { useNavigate } from "react-router-dom";
import { useItemDetails } from "./useItemDetails";
import { ContentContainer } from "../../components/containers/ContentContainer";
import { IconButton } from "../../components/common/IconButton";
import { BackIcon } from "../../components/icons";
import * as S from "./ItemDetailsPage.styles";

export function ItemDetailsPage() {
  const navigate = useNavigate();
  const { item, isLoading, error } = useItemDetails();

  if (isLoading) {
    return (
      <ContentContainer>
        <S.Loading>Loading...</S.Loading>
      </ContentContainer>
    );
  }

  if (error || !item) {
    return (
      <ContentContainer>
        <S.Error>Item not found</S.Error>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <S.Header>
        <IconButton
          onClick={() => navigate("/")}
          aria-label="Back to list"
          style={{ position: 'absolute', left: 0 }}
        >
          <BackIcon />
        </IconButton>

        <S.TitleContainer>
          <S.Title>{item.name}</S.Title>
        </S.TitleContainer>
      </S.Header>

      {item.description && (
        <S.Description>{item.description}</S.Description>
      )}
    </ContentContainer>
  );
}
