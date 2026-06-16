import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { HorizontalScrollStrip } from "@/components/cricket/HorizontalScrollStrip";
import { MatchCard } from "@/components/cricket/MatchCard";
import { StatusScrollSection } from "@/components/cricket/StatusScrollSection";
import { Footer } from "@/components/Footer";
import {
  TOURNAMENT_LIST,
  matchesByStatus,
  type TournamentStatus,
} from "@/lib/sample-tournaments";
import fireball from "@/assets/fireball.png";
import graduate from "@/assets/graduate.png";

export const Route = createFileRoute("/tournament-stats")({
  validateSearch: (search: Record<string, unknown>) => ({
    tournament: typeof search.tournament === "string" ? search.tournament : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Tournament Stats — CricSea" },
      { name: "description", content: "Ongoing, upcoming, and recent matches for your tournament." },
    ],
  }),
  component: TournamentStatsPage,
});

const STATUS_ORDER: TournamentStatus[] = ["ongoing", "upcoming", "recent"];

function TournamentStatsPage() {
  const { tournament: tournamentId } = Route.useSearch();
  const tournament =
    TOURNAMENT_LIST.find((item) => item.id === tournamentId) ?? TOURNAMENT_LIST[0];

  return (
    <div className="relative w-full overflow-x-clip bg-background mesh-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BackgroundGlow bottomGlow={false} />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="mb-10 animate-fade-up">
          <Link
            to="/tournament"
            search={{ tournament: tournament.id }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tournament Overview
          </Link>

          <div className="relative mt-6 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-surface to-surface p-5 sm:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-primary/25 blur-3xl animate-green-glow"
            />
            <div className="relative flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-surface-secondary p-2 shadow-[var(--shadow-glow)]">
                <img src={graduate} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <img src={fireball} alt="" className="h-7 w-auto animate-float" />
                  <h1 className="font-display text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
                    {tournament.name}
                  </h1>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    {tournament.teams} teams
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {tournament.dateRange}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-12 sm:space-y-14">
          {STATUS_ORDER.map((status, index) => {
            const matches = matchesByStatus(status);
            return (
              <StatusScrollSection
                key={status}
                status={status}
                count={matches.length}
                delay={120 + index * 80}
              >
                {matches.length > 0 ? (
                  <HorizontalScrollStrip>
                    {matches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </HorizontalScrollStrip>
                ) : (
                  <div className="glass-card rounded-2xl px-4 py-12 text-center">
                    <p className="text-sm text-text-secondary">No matches in this section.</p>
                  </div>
                )}
              </StatusScrollSection>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
