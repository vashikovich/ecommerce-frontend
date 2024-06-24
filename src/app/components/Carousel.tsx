"use client";

import Button from "@/app/components/Button";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

type CarouselProps = {
  list: ReactNode[];
  visibleCount?: number;
  gap?: number;
  scrollCount?: number;
  snap?: "center" | "start" | "end" | undefined;
  snapMargin?: number;
};

export default function Carousel({
  list,
  visibleCount = undefined,
  gap = 0,
  scrollCount = 1,
  snap = undefined,
  snapMargin = 0,
}: CarouselProps) {
  const containerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const [contentWidth, setContentWidth] = useState<number | undefined>(
    undefined
  );

  const [scrollPos, setScrollPos] = useState(["FAR_LEFT"]);

  const calcScrollPos = () => {
    if (!containerRef.current || contentWidth === undefined) return;

    const pos = [];

    const isFarLeft = containerRef.current.scrollLeft < 0.1 * contentWidth;
    if (isFarLeft) pos.push("FAR_LEFT");

    const isFarRight =
      Math.abs(
        containerRef.current.scrollWidth -
          containerRef.current.clientWidth -
          containerRef.current.scrollLeft
      ) <
      0.1 * contentWidth;
    if (isFarRight) pos.push("FAR_RIGHT");
    setScrollPos(pos);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current !== null)
        setContentWidth(
          visibleCount !== undefined
            ? (containerRef.current?.clientWidth -
                Math.floor(visibleCount) * gap) /
                visibleCount
            : contentRef.current?.clientWidth
        );
    });
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [visibleCount, gap]);

  const sideMargin =
    snap === "center" && contentWidth !== undefined
      ? (containerRef.current?.clientWidth ?? 0) - Number(contentWidth)
      : snapMargin;

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft +=
        (Number(contentWidth) + gap) * scrollCount;
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -=
        (Number(contentWidth) + gap) * scrollCount;
    }
  };

  return (
    <div className="relative">
      <div className="hidden lg:block">
        {!scrollPos.includes("FAR_RIGHT") && (
          <div className="absolute -right-5 inset-y-auto h-full flex items-center z-10 pb-10">
            <Button
              variant="ghost-primary"
              iconOnly
              circular
              onClick={scrollRight}
              className="bg-white"
            >
              {">"}
            </Button>
          </div>
        )}
        {!scrollPos.includes("FAR_LEFT") && (
          <div className="absolute -left-5 inset-y-auto h-full flex items-center z-10 pb-10">
            <Button
              variant="ghost-primary"
              iconOnly
              circular
              onClick={scrollLeft}
              className="bg-white"
            >
              {"<"}
            </Button>
          </div>
        )}
      </div>
      <div
        className="relative overflow-hidden"
        style={{ height: contentRef.current?.clientHeight }}
      >
        <div
          className={classNames(
            "scroll-smooth",
            snap && "snap-x snap-mandatory snap-always",
            contentWidth !== undefined
              ? "pb-40 overflow-x-auto"
              : "overflow-x-hidden"
          )}
          ref={containerRef}
          onScroll={calcScrollPos}
        >
          <div
            className="flex"
            style={{
              gap,
              width:
                contentWidth !== undefined
                  ? "fit-content"
                  : visibleCount === undefined
                  ? "100%"
                  : (100 / visibleCount) * list.length + "%",
            }}
          >
            {list.map((e, i) => (
              <div
                key={i}
                ref={contentRef}
                style={{
                  width: contentWidth,
                  marginLeft: i == 0 ? sideMargin : 0,
                  marginRight: i == list.length - 1 ? sideMargin : 0,
                  scrollMarginLeft: snap === "start" ? snapMargin : 0,
                  scrollMarginRight: snap === "end" ? snapMargin : 0,
                }}
                className={classNames(
                  snap === "center" && "snap-center",
                  snap === "start" && "snap-start",
                  snap === "end" && "snap-end"
                )}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
