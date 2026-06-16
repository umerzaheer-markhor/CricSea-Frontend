import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Keeps the page from scrolling when a tab button is clicked. */
export function preventTabFocusScroll(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
}

export function SubTabBar<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap gap-1 rounded-xl border border-primary/15 bg-primary/[0.06] p-1 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onMouseDown={preventTabFocusScroll}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300",
            active === tab.id
              ? "bg-surface text-primary shadow-[var(--shadow-glow)] ring-1 ring-primary/30"
              : "text-text-muted hover:bg-primary/[0.08] hover:text-primary",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
      {children}
    </h2>
  );
}

export function DetailCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/card relative isolate overflow-hidden rounded-2xl p-4 sm:p-5",
        "border border-primary/15 bg-gradient-to-br from-surface via-surface to-primary/[0.07]",
        "shadow-[var(--shadow-sm)] backdrop-blur-md",
        interactive && "hover-lift transition-all duration-300 hover:border-primary/35 hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_55%),radial-gradient(ellipse_at_100%_100%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_50%)] opacity-70 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export function GlassPanel({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/panel relative isolate overflow-hidden rounded-2xl glass-card",
        interactive &&
          "transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.04] opacity-80"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export function IconBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        "bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
        "ring-1 ring-primary/25 transition-all duration-300",
        "group-hover/card:scale-105 group-hover/card:shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatPill({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3 py-2.5 text-center transition-all duration-300",
        highlight
          ? "border-primary/25 bg-primary/10 shadow-[0_0_16px_-6px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
          : "border-primary/10 bg-primary/[0.05] group-hover/card:border-primary/20 group-hover/card:bg-primary/[0.08]",
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
      <p className="mt-0.5 font-display text-base font-bold tabular-nums text-primary">{value}</p>
    </div>
  );
}

export function TeamAvatar({
  code,
  src,
}: {
  code: string;
  src: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/15 bg-gradient-to-br from-primary/10 to-surface-secondary p-2 transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-primary/35 group-hover/card:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)] sm:h-16 sm:w-16">
        <img src={src} alt="" className="h-full w-full object-contain opacity-90" />
      </div>
      <span className="text-sm font-bold tracking-wide text-text-secondary">{code}</span>
    </div>
  );
}

export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      Live
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div
        aria-hidden
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/25"
      >
        <span className="h-2 w-2 rounded-full bg-primary/60" />
      </div>
      <p className="text-sm text-text-secondary">{children}</p>
    </div>
  );
}
