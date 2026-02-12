import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
