import { Link } from "@tanstack/react-router";
import { MoreVertical } from "lucide-react";
import batter from "@/assets/batter.png";
import graduate from "@/assets/graduate.png";
import type { MatchListItem } from "@/lib/sample-tournaments";
import { cn } from "@/lib/utils";

export function MatchCard({
  match,
  className,
}: {
  match: MatchListItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70",
        "bg-surface/90 p-4 shadow-md backdrop-blur-sm transition-all duration-300 sm:p-5",
        "hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_48px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
        className,
      )}
    >
      {match.isLive ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-danger to-transparent opacity-80"
        />
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-text-secondary sm:text-sm">
          {match.level} <span className="text-text-muted">|</span> {match.format}
        </p>
        <button
          type="button"
          aria-label="Match options"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-secondary hover:text-text-primary"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="chip cursor-default !py-0.5 !text-[10px]">{match.format}</span>
        <span className="chip cursor-default !py-0.5 !text-[10px]">{match.ballType}</span>
        {match.isLive ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-danger">
            <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse-glow" />
            Live
          </span>
        ) : null}
      </div>

      <div className="mt-5 grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-secondary p-1 transition-transform duration-300 group-hover/card:scale-105">
            <img src={batter} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-text-primary sm:text-sm">{match.teamA.name}</p>
            <p className="text-sm font-bold text-text-primary">{match.teamA.score}</p>
            <p className="text-xs font-semibold text-primary">({match.teamA.overs})</p>
          </div>
        </div>

        <div className="rounded-xl bg-surface-secondary/80 px-2 py-1.5 text-center">
          <p className="font-display text-base font-bold text-danger sm:text-lg">VS</p>
          <p className="mt-0.5 text-[10px] font-medium text-text-muted sm:text-xs">{match.time}</p>
        </div>

        <div className="flex min-w-0 flex-row-reverse items-center gap-2 text-right">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-secondary p-1 transition-transform duration-300 group-hover/card:scale-105">
            <img src={graduate} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-text-primary sm:text-sm">{match.teamB.name}</p>
            <p className="text-sm font-bold text-text-primary">{match.teamB.score}</p>
            <p className="text-xs font-semibold text-primary">({match.teamB.overs})</p>
          </div>
        </div>
      </div>

      <Link
        to="/match"
        className="mt-5 flex w-full items-center justify-center rounded-xl py-2.5 text-sm font-bold text-primary-foreground btn-cta"
      >
        {match.actionLabel}
      </Link>
    </article>
  );
}
