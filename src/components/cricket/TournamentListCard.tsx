import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import graduate from "@/assets/graduate.png";
import type { TournamentListItem } from "@/lib/sample-tournaments";
import { cn } from "@/lib/utils";

export function TournamentListCard({
  tournament,
  className,
}: {
  tournament: TournamentListItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70",
        "bg-surface/90 p-5 shadow-md backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_48px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/15 bg-surface-secondary p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-300 group-hover/card:scale-105">
            <div aria-hidden className="absolute inset-0 bg-primary/5" />
            <img src={graduate} alt="" className="relative h-full w-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base font-bold leading-snug text-text-primary transition-colors group-hover/card:text-primary sm:text-lg">
              {tournament.name}
            </h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-text-secondary">
              <Users className="h-4 w-4 shrink-0 text-primary/70" />
              {tournament.teams} Teams
            </p>
          </div>
        </div>

        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <Calendar className="h-4 w-4 shrink-0" />
          {tournament.dateRange}
        </p>

        <Link
          to="/tournament"
          search={{ tournament: tournament.id }}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-primary-foreground btn-cta"
        >
          View Stats
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
