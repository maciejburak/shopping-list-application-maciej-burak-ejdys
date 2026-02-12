import { type ReactNode } from "react";
import * as S from "./ContentContainer.styles";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

export function ContentContainer({ children, title }: PageContainerProps) {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}
      {children}
    </S.Container>
  );
}
