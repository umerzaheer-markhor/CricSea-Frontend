import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { HorizontalScrollStrip } from "@/components/cricket/HorizontalScrollStrip";
import { StatusScrollSection } from "@/components/cricket/StatusScrollSection";
import { TournamentListCard } from "@/components/cricket/TournamentListCard";
import { tournamentsByStatus, type TournamentStatus } from "@/lib/sample-tournaments";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/dashboard/tournaments")({
  head: () => ({
    meta: [
      { title: "Tournaments — CricSea" },
      { name: "description", content: "Manage ongoing, upcoming, and recent cricket tournaments." },
    ],
  }),
  component: DashboardTournamentsPage,
});

const STATUS_ORDER: TournamentStatus[] = ["ongoing", "upcoming", "recent"];

function DashboardTournamentsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="animate-fade-up">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-surface to-surface p-5 sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl animate-green-glow"
          />
          <div className="relative flex items-start gap-3">
            <img src={fireball} alt="" className="mt-0.5 h-7 w-auto" />
            <div>
              <Link
                to="/dashboard/manage-cricket"
                className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Manage Cricket
              </Link>
              <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">Tournaments</h2>
              <p className="mt-1 max-w-xl text-sm text-text-secondary">
                Swipe through each row or use the arrows to browse ongoing, upcoming, and recent
                tournaments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-12 sm:space-y-14">
        {STATUS_ORDER.map((status, index) => {
          const tournaments = tournamentsByStatus(status);
          return (
            <StatusScrollSection
              key={status}
              status={status}
              count={tournaments.length}
              delay={100 + index * 80}
            >
              {tournaments.length > 0 ? (
                <HorizontalScrollStrip>
                  {tournaments.map((tournament) => (
                    <TournamentListCard key={tournament.id} tournament={tournament} />
                  ))}
                </HorizontalScrollStrip>
              ) : (
                <div className="glass-card rounded-2xl px-6 py-12 text-center">
                  <p className="text-sm font-medium text-text-secondary">
                    No {status} tournaments yet.
                  </p>
                </div>
              )}
            </StatusScrollSection>
          );
        })}
      </div>
    </div>
  );
}
