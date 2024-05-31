// components/Button.tsx
import React from "react";
import classNames from "classnames";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "text";
  color?: string;
  text: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "primary",
  color,
  text,
  iconStart,
  iconEnd,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded focus:outline-none";

  const sizeClasses = classNames({
    "px-4 py-2 text-sm": size === "small",
    "px-6 py-3 text-base": size === "medium",
    "px-8 py-4 text-lg": size === "large",
  });

  const variantClasses = classNames({
    "bg-blue-900 text-white hover:bg-coral": variant === "primary",
    "bg-coral text-white hover:bg-blue-900": variant === "secondary",
    "bg-transparent text-blue-900 hover:text-coral": variant === "text",
  });

  const customColorClasses = color
    ? `bg-${color} text-white hover:bg-opacity-75`
    : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${customColorClasses}`}
    >
      {iconStart && <span className="mr-2">{iconStart}</span>}
      {text}
      {iconEnd && <span className="ml-2">{iconEnd}</span>}
    </button>
  );
};

export default Button;
