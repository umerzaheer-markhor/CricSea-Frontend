import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  GitBranch,
  MapPin,
  UserCog,
  Users,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { getTournament, type Tournament } from "@/lib/tournament-store";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/create-tournament/$tournamentId/created")({
  head: () => ({
    meta: [
      { title: "Tournament Created — CricSea" },
      { name: "description", content: "Your tournament was created. Complete the setup steps." },
    ],
  }),
  component: TournamentCreatedPage,
});

const SETUP_STEPS = [
  {
    id: "draws",
    label: "Add draws & rounds",
    icon: ClipboardList,
    to: "/create-tournament/$tournamentId/create-draw" as const,
  },
  {
    id: "teams",
    label: "Add & manage team",
    icon: Users,
    to: "/create-tournament/$tournamentId/teams" as const,
  },
  {
    id: "officials",
    label: "Add & manage officials",
    icon: UserCog,
    to: "/create-tournament/$tournamentId/officials" as const,
  },
  {
    id: "grounds",
    label: "Add & manage grounds",
    icon: MapPin,
    to: "/create-tournament/$tournamentId/grounds" as const,
  },
  {
    id: "fixtures",
    label: "Manage fixtures",
    icon: GitBranch,
    to: null,
  },
] as const;

function TournamentCreatedPage() {
  const { tournamentId } = Route.useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const found = getTournament(tournamentId);
    if (!found) {
      navigate({ to: "/create-tournament" });
      return;
    }
    setTournament(found);
  }, [tournamentId, navigate]);

  const goToCreateDraw = () => {
    navigate({
      to: "/create-tournament/$tournamentId/create-draw",
      params: { tournamentId },
    });
  };

  if (!tournament) return null;

  return (
    <TournamentPageShell fillViewport>
      <main className="relative mx-auto w-full max-w-5xl flex-1 px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <section className="animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-8 w-auto shrink-0" />
            <h1 className="font-display text-xl sm:text-2xl md:text-[1.75rem] font-bold text-text-primary leading-snug">
              Good job! your tournament is created
            </h1>
          </div>
          <p className="mt-3 pl-11 text-sm sm:text-base text-text-secondary">
            Few more step and you and good to go.
          </p>
        </section>

        <section className="mt-10 sm:mt-12 space-y-5 sm:space-y-6 animate-fade-up">
          {SETUP_STEPS.map((step) => {
            const Icon = step.icon;
            const row = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground glow-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="text-base sm:text-lg font-medium text-text-secondary">{step.label}</span>
              </>
            );

            if (step.to) {
              return (
                <Link
                  key={step.id}
                  to={step.to}
                  params={{ tournamentId }}
                  className="flex items-center gap-4 transition-opacity hover:opacity-80"
                >
                  {row}
                </Link>
              );
            }

            return (
              <div key={step.id} className="flex items-center gap-4">
                {row}
              </div>
            );
          })}
        </section>

        <button
          type="button"
          onClick={goToCreateDraw}
          className={cn(
            "mt-10 sm:mt-12 rounded-lg px-14 py-3 text-sm font-bold text-primary-foreground btn-cta animate-fade-up",
          )}
        >
          Let&apos;s go
        </button>
      </main>

      <Footer />
    </TournamentPageShell>
  );
}
