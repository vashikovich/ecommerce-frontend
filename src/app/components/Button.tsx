// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?:
    | "primary"
    | "secondary"
    | "ghost-primary"
    | "ghost-secondary"
    | "ghost-white"
    | "text";
  text: string;
  fullWidth?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  iconOnly?: boolean;
  circular?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "primary",
  text,
  fullWidth = false,
  iconStart = null,
  iconEnd = null,
  iconOnly = false,
  circular = false,
  className = "",
  ...props
}) => {
  const baseClasses = classNames([
    "inline-flex items-center justify-center font-bold focus:outline-none",
    fullWidth && "w-full",
    circular ? "rounded-full" : "rounded",
  ]);

  const sizeClasses = classNames(
    iconOnly
      ? {
          "p-1 w-8 h-8": size === "small",
          "p-2 w-11 h-11": size === "medium",
          "p-3 w-14 h-14": size === "large",
        }
      : {
          "px-4 py-1 text-sm": size === "small",
          "px-6 py-2 text-base": size === "medium",
          "px-8 py-3 text-lg": size === "large",
        }
  );

  const variantClasses = classNames({
    "border-blue-900 border-2bg-blue-900 text-white hover:bg-coral":
      variant === "primary",
    "border-coral border-2 bg-coral text-white hover:bg-blue-900 hover:border-blue-900":
      variant === "secondary",
    "border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white":
      variant === "ghost-primary",
    "border-coral border-2 text-coral hover:bg-coral hover:text-white":
      variant === "ghost-secondary",
    "border-white border-2 text-white hover:bg-white hover:text-blue-900":
      variant === "ghost-white",
    "border-transparent border-2 bg-transparent text-blue-900 hover:text-coral":
      variant === "text",
  });

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {iconStart && <span className="mr-2">{iconStart}</span>}
      {text}
      {iconEnd && <span className="ml-2">{iconEnd}</span>}
    </button>
  );
};

export default Button;
