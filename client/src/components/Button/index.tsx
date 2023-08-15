import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "./types";

const buttonStyles = {
  primary: "bg-emerald-400 text-black not-disabled:hover:bg-emerald-300",
  warning: "bg-red-600 text-white not-disabled:hover:bg-red-500",
  secondary:
    "border-emerald-400 border-2 not-disabled:hover:bg-emerald-400 not-disabled:hover:text-black",
};

const Button: FunctionComponent<ButtonProps> = (props) => {
  const {
    role,
    children,
    isLoading,
    className: classNameProp,
    variant = "primary",
  } = props;
  const className = `${buttonStyles[variant]} disabled:opacity-70 disabled:cursor-not-allowed flex cursor-pointer ${classNameProp} items-center justify-center whitespace-nowrap transition h-12 px-6 rounded-md font-medium`;

  const calculatedChildren = isLoading
    ? new Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={`loading-dot.${index}`}
            style={{ animationDelay: `${300 * index}ms` }}
            className="w-2.5 h-2.5 rounded-full first-of-type:ml-0 ml-1 bg-black/40 animate-grow"
          />
        ))
    : children;

  if (role === "link") {
    const { href } = props;

    return (
      <Link className={className} to={href}>
        {calculatedChildren}
      </Link>
    );
  }

  const { onClick, disabled, className: _, ...buttonAttributes } = props;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...buttonAttributes}
    >
      {calculatedChildren}
    </button>
  );
};

export { Button };
