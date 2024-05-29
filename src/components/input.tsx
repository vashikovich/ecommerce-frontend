// components/Input.tsx
import React from "react";

type InputProps = {
  type: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder = "",
  value,
  onChange,
  color = "border-gray-300",
}) => {
  const baseClasses =
    "w-full px-4 py-2 rounded focus:outline-none focus:ring-2";
  const colorClasses = `border ${color} focus:border-blue-900`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${colorClasses}`}
    />
  );
};

export default Input;
