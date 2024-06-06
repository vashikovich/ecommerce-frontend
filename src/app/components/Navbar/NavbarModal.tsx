import { MouseEventHandler, ReactNode } from "react";

export default function NavbarModal({
  children,
  onOverlayClick,
}: {
  children: ReactNode;
  onOverlayClick?: MouseEventHandler;
}) {
  return (
    <div className="fixed z-50 inset-0 top-14 lg:top-36">
      <div className="relative z-50">
        {children}
        <div
          className="bg-black/80 fixed w-full h-full z-10"
          onClick={onOverlayClick}
        />
      </div>
    </div>
  );
}
