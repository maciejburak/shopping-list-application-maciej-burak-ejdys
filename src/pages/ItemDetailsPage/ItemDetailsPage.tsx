import { useNavigate } from "react-router-dom";
import { useItemDetails } from "./useItemDetails";
import { ContentContainer } from "../../components/containers/ContentContainer";
import { IconButton } from "../../components/common/IconButton";
import { BackIcon } from "../../components/icons";
import * as S from "./ItemDetailsPage.styles";
import { MobileContainer } from "../../components/containers/MobileContainer";

export function ItemDetailsPage() {
  const navigate = useNavigate();
  const { item, isLoading, error } = useItemDetails();

  if (isLoading) {
    return (
      <MobileContainer>
        <ContentContainer>
          <S.Loading>Loading...</S.Loading>
        </ContentContainer>
      </MobileContainer>
    );
  }

  if (error || !item) {
    return (
      <MobileContainer>
        <ContentContainer>
          <S.Error>Item not found</S.Error>
        </ContentContainer>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <ContentContainer>
        <S.Header>
          <IconButton
            onClick={() => navigate("/")}
            aria-label="Back to list"
            style={{ position: "absolute", left: 0 }}
          >
            <BackIcon />
          </IconButton>

          <S.TitleContainer>
            <S.Title>{item.name}</S.Title>
          </S.TitleContainer>
        </S.Header>

        {item.description && <S.Description>{item.description}</S.Description>}
      </ContentContainer>
    </MobileContainer>
  );
}
