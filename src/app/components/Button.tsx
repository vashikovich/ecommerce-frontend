// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost" | "text";
  color?: string;
  text: string;
  fullWidth?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "primary",
  color,
  text,
  fullWidth,
  iconStart,
  iconEnd,
  ...props
}) => {
  const baseClasses = classNames([
    "inline-flex items-center justify-center font-bold rounded focus:outline-none",
    fullWidth && "w-full",
  ]);

  const sizeClasses = classNames({
    "px-4 py-1 text-sm": size === "small",
    "px-6 py-2 text-base": size === "medium",
    "px-8 py-3 text-lg": size === "large",
  });

  const variantClasses = classNames({
    "border-blue-900 border-2bg-blue-900 text-white hover:bg-coral":
      variant === "primary",
    "border-coral border-2 bg-coral text-white hover:bg-blue-900":
      variant === "secondary",
    "border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white":
      variant === "ghost",
    "border-transparent border-2 bg-transparent text-blue-900 hover:text-coral":
      variant === "text",
  });

  const customColorClasses = color
    ? `bg-${color} text-white hover:bg-opacity-75`
    : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${customColorClasses}`}
      {...props}
    >
      {iconStart && <span className="mr-2">{iconStart}</span>}
      {text}
      {iconEnd && <span className="ml-2">{iconEnd}</span>}
    </button>
  );
};

export default Button;
