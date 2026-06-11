import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  selected?: boolean;
  preview?: boolean;
  onClick: () => void;
  avatar: ReactNode;
  title: string;
  subtitle?: string;
  badges?: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
  className?: string;
}

export function PreviewBadge() {
  return (
    <span className="inline-flex rounded-lg border border-border bg-surface-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
      Preview
    </span>
  );
}

export function SelectionCard({
  selected = false,
  preview = false,
  onClick,
  avatar,
  title,
  subtitle,
  badges,
  footerLeft,
  footerRight,
  className,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "glass-card team-card-glow relative w-full overflow-hidden p-0 text-left transition-all duration-300",
        preview ? "border-dashed opacity-95" : "hover-lift",
        selected &&
          "border-primary ring-2 ring-primary/60 shadow-[var(--shadow-glow-hover)] scale-[1.01] card-selected-glow",
        className,
      )}
    >
      <div className="relative z-10 flex gap-4 p-4 sm:p-5">
        <div className="relative h-[4.5rem] w-[4.5rem] shrink-0">
          <div className="flex h-full w-full overflow-hidden rounded-xl border border-border/70 bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {avatar}
          </div>
          <span
            className={cn(
              "absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-[var(--shadow-sm)] transition-all duration-300",
              selected
                ? "border-primary bg-primary text-primary-foreground glow-primary"
                : "border-border bg-surface-elevated text-text-muted",
            )}
          >
            <Check
              className={cn("h-3.5 w-3.5 transition-opacity", selected ? "opacity-100" : "opacity-0")}
              strokeWidth={2.75}
            />
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold text-text-primary sm:text-lg">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                {subtitle}
              </p>
            )}
          </div>
          {(badges || preview) && (
            <div className="flex flex-wrap items-center gap-2">
              {badges}
              {preview && <PreviewBadge />}
            </div>
          )}
        </div>
      </div>

      {(footerLeft || footerRight) && (
        <div className="relative z-10 flex items-center justify-between gap-4 border-t border-primary/10 bg-surface-secondary/40 px-4 py-3 sm:px-5">
          <div className="min-w-0">{footerLeft}</div>
          <div className="shrink-0">{footerRight}</div>
        </div>
      )}
    </button>
  );
}
