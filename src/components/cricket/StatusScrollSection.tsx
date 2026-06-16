import { Activity, CalendarClock, History } from "lucide-react";
import type { ReactNode } from "react";
import {
  STATUS_LABELS,
  STATUS_META,
  type TournamentStatus,
} from "@/lib/sample-tournaments";
import { cn } from "@/lib/utils";

const STATUS_ICONS = {
  ongoing: Activity,
  upcoming: CalendarClock,
  recent: History,
} as const;

export function StatusScrollSection({
  status,
  count,
  children,
  className,
  delay = 0,
}: {
  status: TournamentStatus;
  count: number;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const meta = STATUS_META[status];
  const Icon = STATUS_ICONS[status];

  return (
    <section
      className={cn("space-y-5 animate-fade-up opacity-0 [animation-fill-mode:forwards]", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 px-4 py-4 sm:px-5 sm:py-5">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-r opacity-80",
            meta.accent,
          )}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <Icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                  {STATUS_LABELS[status]}
                </h3>
                <span className={cn("h-2 w-2 rounded-full", meta.dot)} />
              </div>
              <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">{meta.description}</p>
            </div>
          </div>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold tabular-nums text-primary">
            {count} {count === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {children}
    </section>
  );
}
