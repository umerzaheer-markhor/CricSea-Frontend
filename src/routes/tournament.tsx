import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { TournamentDetailContent } from "@/components/tournament-detail/TournamentDetailContent";
import { Footer } from "@/components/Footer";
import { TOURNAMENT_LIST } from "@/lib/sample-tournaments";
import type { TournamentDetailTab } from "@/lib/tournament-detail-data";

const VALID_TABS: TournamentDetailTab[] = [
  "overview",
  "matches",
  "squads",
  "leaderboard",
  "officials",
  "info",
];

function parseTab(value: unknown): TournamentDetailTab {
  if (typeof value === "string" && VALID_TABS.includes(value as TournamentDetailTab)) {
    return value as TournamentDetailTab;
  }
  return "overview";
}

function buildTournamentSearch(tournamentId: string, tab: TournamentDetailTab) {
  const params = new URLSearchParams();
  params.set("tournament", tournamentId);
  params.set("tab", tab);
  return params.toString();
}

export const Route = createFileRoute("/tournament")({
  validateSearch: (search: Record<string, unknown>) => ({
    tournament: typeof search.tournament === "string" ? search.tournament : undefined,
    tab: parseTab(search.tab),
  }),
  head: () => ({
    meta: [
      { title: "Tournament — CricSea" },
      { name: "description", content: "Tournament details, matches, squads, and standings." },
    ],
  }),
  component: TournamentPage,
});

function TournamentPage() {
  const { tournament: tournamentId, tab: urlTab } = Route.useSearch();
  const [activeTab, setActiveTab] = useState<TournamentDetailTab>(urlTab);

  const tournament =
    TOURNAMENT_LIST.find((item) => item.id === tournamentId) ?? TOURNAMENT_LIST[0];

  useEffect(() => {
    setActiveTab(urlTab);
  }, [urlTab]);

  const handleTabChange = (tab: TournamentDetailTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);

    const search = buildTournamentSearch(tournament.id, tab);
    window.history.replaceState(window.history.state, "", `/tournament?${search}`);
  };

  return (
    <div className="relative w-full overflow-x-clip bg-background mesh-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BackgroundGlow />
      </div>

      <main className="relative mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <TournamentDetailContent
          tournament={tournament}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </main>

      <Footer />
    </div>
  );
}
