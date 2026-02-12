import { type ReactNode } from "react";
import * as S from "./MobileContainer.styles";

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <S.Container>
      <S.Notch />
      <S.Content>
        <S.ContentContainer>
          {children}
        </S.ContentContainer>
      </S.Content>
      <S.BottomPart>
        <S.BottomBar />
      </S.BottomPart>
    </S.Container>
  );
}
