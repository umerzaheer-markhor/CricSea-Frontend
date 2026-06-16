import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export const horizontalScrollCardClassName =
  "snap-start shrink-0 w-[min(68vw,17.5rem)] sm:w-[19rem] lg:w-[20rem]";

export function HorizontalScrollStrip({
  children,
  className,
  cardClassName,
}: {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(maxScroll > 8 && track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, children]);

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.72, 280);
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const items = Children.map(children, (child, index) => (
    <div
      key={index}
      className={cn(
        cardClassName ?? horizontalScrollCardClassName,
        "animate-fade-up opacity-0 [animation-fill-mode:forwards]",
      )}
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      {child}
    </div>
  ));

  return (
    <div
      className={cn(
        "group/strip relative overflow-hidden rounded-3xl border border-primary/15",
        "bg-gradient-to-br from-surface/80 via-surface-secondary/50 to-surface/40",
        "p-1 shadow-[0_20px_50px_-30px_color-mix(in_oklab,var(--primary)_35%,transparent)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-strip-glow"
      />

      <div className="relative overflow-hidden rounded-[1.35rem] bg-background/40 backdrop-blur-[2px]">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 py-5 no-scrollbar snap-x snap-mandatory scroll-px-4 sm:gap-5 sm:px-5 sm:py-6 sm:scroll-px-5"
        >
          {items}
          <div className="w-8 shrink-0 snap-end sm:w-12" aria-hidden />
        </div>

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background/95 via-background/50 to-transparent transition-opacity duration-300 sm:w-24",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background/95 via-background/55 to-transparent transition-opacity duration-300 sm:w-28",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
        />

        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByAmount("left")}
          className={cn(
            "absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-border/70 bg-surface/95 text-text-primary shadow-lg backdrop-blur-md",
            "transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-[var(--shadow-glow)]",
            canScrollLeft
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-2 opacity-0",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByAmount("right")}
          className={cn(
            "absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-border/70 bg-surface/95 text-primary shadow-lg backdrop-blur-md",
            "transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]",
            canScrollRight
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-2 opacity-0",
          )}
        >
          <ChevronRight className={cn("h-5 w-5", canScrollRight && "animate-scroll-hint")} />
        </button>
      </div>
    </div>
  );
}
