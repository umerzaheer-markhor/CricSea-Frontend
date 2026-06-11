import { createFileRoute } from "@tanstack/react-router";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { Footer } from "@/components/Footer";
import fireball from "@/assets/fireball.png";
import tournamentBanner from "@/assets/tournament1.jpg";
import batsman from "@/assets/batsman.png";

export const Route = createFileRoute("/tournament")({
  head: () => ({
    meta: [
      { title: "Tournament — CricSea" },
      { name: "description", content: "Tournament details, groups and standings." },
    ],
  }),
  component: TournamentPage,
});

const COLS = ["M", "W", "L", "D", "P", "NR"];

function TournamentPage() {
  return (
    <div className="relative w-full overflow-x-clip bg-background mesh-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BackgroundGlow />
      </div>

      <main className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero: banner + title overlay + floating crest */}
        <section className="relative animate-fade-up">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lg)] group">
            <img
              src={tournamentBanner}
              alt="Tournament"
              className="h-56 sm:h-72 md:h-[22rem] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            {/* readability + brand gradient */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_60%)]" />

            {/* Title block over banner */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
              <div className="flex items-end gap-4 sm:gap-6">
                {/* Crest */}
                <div className="relative shrink-0 animate-scale-in">
                  <div aria-hidden className="absolute -inset-2 rounded-2xl bg-primary/30 blur-2xl" />
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl bg-surface/90 backdrop-blur-xl ring-1 ring-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] p-1.5">
                    <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                      <img src={batsman} alt="" className="h-full w-full object-contain" />
                    </div>
                  </div>
                </div>

                {/* Title + meta */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary ring-1 ring-primary/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                      Tournament
                    </span>
                    <span className="chip cursor-default !py-0.5 !text-[10px] !uppercase !tracking-[0.14em]">T20 · Knockout</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-[1.05]">
                    Tournament Name
                  </h1>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      <span className="font-semibold text-text-primary">18 May 2026 — 31 May 2026</span>
                    </span>
                    <span className="hidden sm:inline h-1 w-1 rounded-full bg-text-muted" />
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Lahore, PK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Group A */}
        <section className="space-y-4 animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-7 w-auto animate-float" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Group A</h2>
          </div>

          <div className="overflow-hidden rounded-2xl glass-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-text-primary border-b border-border">
                    <th className="px-5 py-4 font-bold">Team</th>
                    {COLS.map((c) => (
                      <th key={c} className="px-4 py-4 font-bold text-center">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={COLS.length + 1} className="px-5 py-12 text-center text-sm text-text-secondary">
                      No matches played in this pool yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
}
