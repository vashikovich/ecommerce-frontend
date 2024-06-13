import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  startAdornment = null,
  endAdornment = null,
  error = false,
  className = "",
  ...props
}) => {
  const baseClasses = classNames(
    "p-2 rounded focus:outline-none focus:ring-2 bg-white flex border",
    props.type === "checkbox" || props.type === "radio" ? "w-fit" : "w-full"
  );
  const validClasses = "border-gray-300 focus:border-blue-900";
  const errorClasses = "border-coral text-coral";

  return (
    <div
      className={classNames(
        baseClasses,
        error ? errorClasses : validClasses,
        className
      )}
    >
      {startAdornment && <span>{startAdornment}</span>}
      <input className="flex-1 px-2 text-black outline-none" {...props} />
      {endAdornment && <span>{endAdornment}</span>}
    </div>
  );
};

export default Input;
