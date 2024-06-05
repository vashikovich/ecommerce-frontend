import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder = "",
  value,
  onChange,
  color = "border-gray-300",
  startAdornment = null,
  endAdornment = null,
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full p-2 rounded focus:outline-none focus:ring-2 bg-white flex";
  const colorClasses = `border ${color} focus:border-blue-900`;

  return (
    <div className={`${baseClasses} ${colorClasses} ${className}`}>
      {startAdornment && <span>{startAdornment}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 px-2 text-black outline-none"
        {...props}
      />
      {endAdornment && <span>{endAdornment}</span>}
    </div>
  );
};

export default Input;
