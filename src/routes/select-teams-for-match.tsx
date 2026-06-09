import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { Footer } from "@/components/Footer";
import fireball from "@/assets/fireball.png";
import group from "@/assets/group.png";

export const Route = createFileRoute("/select-teams-for-match")({
  head: () => ({
    meta: [
      { title: "Select Teams for Match — CricSea" },
      { name: "description", content: "Set up your cricket match by selecting two teams and their squads." },
    ],
  }),
  component: SelectTeamsPage,
});

function SelectTeamsPage() {
  const [teamA, setTeamA] = useState<string | null>(null);
  const [teamB, setTeamB] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background mesh-bg flex flex-col">
      <BackgroundGlow />

      <main className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 flex-1">
        {/* Title */}
        <section className="space-y-4 animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-7 w-auto" />
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
              Create Matches
            </h1>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
              Cool! Let us help you to setup your match . Add{" "}
              <span className="text-gradient-primary">/ select your teams</span>
            </h2>
            <p className="text-sm text-text-secondary">
              You can select squads for the match while selecting/adding team.
            </p>
          </div>
        </section>

        {/* VS Selection Card */}
        <section className="animate-fade-up">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-secondary/60 backdrop-blur p-6 sm:p-10 shadow-[var(--card-shadow)]">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 mesh-bg" />
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary blur-3xl animate-green-glow" />

            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-8 md:gap-4">
              {/* Team A */}
              <TeamSlot
                side="A"
                selected={teamA}
                onSelect={() => setTeamA(teamA ? null : "Lions XI")}
              />

              {/* VS Center */}
              <div className="flex items-center justify-center">
                <p className="font-display text-7xl sm:text-8xl font-extrabold tracking-tighter text-gradient-primary leading-none drop-shadow-[0_8px_24px_rgba(34,197,94,0.35)]">
                  VS
                </p>
              </div>

              {/* Team B */}
              <TeamSlot
                side="B"
                selected={teamB}
                onSelect={() => setTeamB(teamB ? null : "Tigers XI")}
                mirror
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TeamSlot({
  side,
  selected,
  onSelect,
  mirror = false,
}: {
  side: "A" | "B";
  selected: string | null;
  onSelect: () => void;
  mirror?: boolean;
}) {
  return (
    <div className="relative group flex flex-col items-center">
      <img
        src={group}
        alt={`Team ${side}`}
        className={`h-44 sm:h-56 w-auto object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.25)] transition-transform duration-500 group-hover:-translate-y-2 dark:invert dark:brightness-200 ${
          mirror ? "scale-x-[-1]" : ""
        }`}
      />
      <button
        onClick={onSelect}
        className={`-mt-6 relative z-10 w-full max-w-[220px] rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
          selected
            ? "btn-cta text-primary-foreground"
            : "bg-surface border border-border text-text-primary hover:border-primary/50 hover:text-primary shadow-[var(--shadow-md)]"
        }`}
      >
        {selected ?? "Select Team"}
      </button>
    </div>
  );
}
