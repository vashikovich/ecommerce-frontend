import classNames from "classnames";
import React, { InputHTMLAttributes, ReactEventHandler } from "react";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: {
    label: string;
    value: any;
  }[];
  error?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  error = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full p-2 rounded focus:outline-none focus:ring-2 bg-white flex border";
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
      <select className="flex-1 px-2 text-black outline-none" {...props}>
        {options.map((o) => (
          <option value={o.value} key={`${o.label}_${o.value}`}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
