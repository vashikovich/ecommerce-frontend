// components/TextArea.tsx
import React from "react";

type TextAreaProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  color?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  placeholder = "",
  value,
  onChange,
  color = "border-gray-300",
}) => {
  const baseClasses =
    "w-full px-4 py-2 rounded focus:outline-none focus:ring-2";
  const colorClasses = `border ${color} focus:border-blue-900`;

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${colorClasses}`}
    ></textarea>
  );
};

export default TextArea;
