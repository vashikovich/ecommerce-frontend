import { useState } from "react";

const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      onClick={toggleMenu}
      className="flex flex-col items-center justify-center w-10 space-y-1.5 bg-blue-900 rounded md:hidden"
    >
      <div
        className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
          isOpen ? "transform rotate-45 translate-y-2" : ""
        }`}
      />
      <div
        className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <div
        className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
          isOpen ? "transform -rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
};

export default BurgerButton;
