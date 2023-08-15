import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type DefaultButtonProps = {
  variant?: "primary" | "secondary" | "warning";
  isLoading?: boolean;
};

type ButtonButtonProps = {
  role: "button";
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorButtonProps = {
  role: "link";
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = DefaultButtonProps & (ButtonButtonProps | AnchorButtonProps);

export type { ButtonProps };
