import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { StyledIconButton } from "./IconButton.styles";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <StyledIconButton {...props}>
      {children}
    </StyledIconButton>
  );
}
