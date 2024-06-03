import { ReactNode } from "react";

export default function NavbarModal({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 top-16">
      <div className="bg-black/80 fixed top-0 w-full h-full z-10" />
      <div className="relative z-50">{children}</div>
    </div>
  );
}
