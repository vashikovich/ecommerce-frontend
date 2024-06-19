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
    "p-2 rounded focus:outline-none focus:ring-2 flex border",
    props.type === "checkbox" || props.type === "radio" ? "w-fit" : "w-full"
  );
  const validClasses = "border-gray-300 focus:border-blue-900 bg-white";
  const errorClasses = "border-coral text-coral bg-white";
  const disabledClasses = "bg-light-gray cursor-not-allowed";

  return (
    <div
      className={classNames(
        baseClasses,
        error ? errorClasses : props.disabled ? disabledClasses : validClasses,
        className
      )}
    >
      {startAdornment && <span>{startAdornment}</span>}
      <input
        className={classNames(
          "flex-1 px-2 text-black outline-none",
          props.disabled && disabledClasses
        )}
        {...props}
      />
      {endAdornment && <span>{endAdornment}</span>}
    </div>
  );
};

export default Input;
