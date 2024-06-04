import { MouseEventHandler, useState } from "react";

const BurgerButton = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center w-10 space-y-1.5 bg-blue-900 rounded">
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
    </div>
  );
};

export default BurgerButton;
