"use client";
import Button from "@/app/components/Button";
import { LegacyRef, ReactNode, useRef } from "react";

export default function Carousel({ list }: { list: ReactNode[] }) {
  const containerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft +=
        (contentRef.current?.clientWidth + 16) * 2;
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -=
        (contentRef.current?.clientWidth + 16) * 2;
    }
  };

  return (
    <div className="relative">
      <div className="hidden lg:block">
        <div className="absolute -right-5 inset-y-auto h-full flex items-center z-10 pb-10">
          <Button
            text=">"
            variant="ghost-primary"
            iconOnly
            circular
            onClick={scrollRight}
            className="bg-white"
          />
        </div>
        <div className="absolute -left-5 inset-y-auto h-full flex items-center z-10 pb-10">
          <Button
            text="<"
            variant="ghost-primary"
            iconOnly
            circular
            onClick={scrollLeft}
            className="bg-white"
          />
        </div>
      </div>
      <div className="relative overflow-y-hidden h-[21rem]">
        <div className="overflow-x-auto h-96 scroll-smooth" ref={containerRef}>
          <div className="w-fit flex gap-4">
            {list.map((e, i) => (
              <div key={i} ref={i == 0 ? contentRef : undefined}>
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
