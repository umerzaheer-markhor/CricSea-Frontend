import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MoreVertical } from "lucide-react";
import type { TournamentListItem } from "@/lib/sample-tournaments";
import type { TournamentDetailTab } from "@/lib/tournament-detail-data";
import { TOURNAMENT_DETAIL_TABS } from "@/lib/tournament-detail-data";
import graduate from "@/assets/graduate.png";
import tournamentBanner from "@/assets/tournament1.jpg";
import { cn } from "@/lib/utils";
import { InfoPanel } from "./InfoPanel";
import { LeaderboardPanel } from "./LeaderboardPanel";
import { MatchesPanel } from "./MatchesPanel";
import { OfficialsPanel } from "./OfficialsPanel";
import { OverviewPanel } from "./OverviewPanel";
import { SquadsPanel } from "./SquadsPanel";
import { preventTabFocusScroll } from "./shared";

function formatDateRange(dateRange: string) {
  return dateRange.replace(/-/g, " ").replace("  ", " - ");
}

function TabPanel({
  id,
  activeTab,
  children,
}: {
  id: TournamentDetailTab;
  activeTab: TournamentDetailTab;
  children: ReactNode;
}) {
  const isActive = activeTab === id;
  return (
    <div
      id={`tournament-panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tournament-tab-${id}`}
      hidden={!isActive}
    >
      {children}
    </div>
  );
}

export function TournamentDetailContent({
  tournament,
  activeTab,
  onTabChange,
}: {
  tournament: TournamentListItem;
  activeTab: TournamentDetailTab;
  onTabChange: (tab: TournamentDetailTab) => void;
}) {
  return (
    <>
      <Link
        to="/dashboard/tournaments"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tournaments
      </Link>

      {/* Static hero — unchanged across tabs */}
      <section className="relative mb-8 animate-fade-up">
        <div className="group relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lg)]">
          <img
            src={tournamentBanner}
            alt=""
            className="h-56 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] sm:h-72 md:h-[22rem]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_60%)]"
          />

          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
            <button
              type="button"
              aria-label="More options"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/80 text-text-secondary backdrop-blur-sm"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="relative shrink-0 animate-scale-in">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-2xl bg-primary/20 blur-2xl"
                />
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-surface p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-border sm:h-24 sm:w-24">
                  <img src={graduate} alt="" className="h-full w-full object-contain" />
                </div>
              </div>

              <div className="min-w-0 flex-1 pb-1">
                <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl md:text-4xl">
                  {tournament.name}
                </h1>
                <p className="mt-2 text-sm font-semibold text-primary sm:text-base">
                  {formatDateRange(tournament.dateRange)}
                </p>
                <p className="mt-1 text-sm text-text-secondary">Teams {tournament.teams}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary tabs */}
      <nav
        aria-label="Tournament sections"
        role="tablist"
        className="mb-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar"
      >
        {TOURNAMENT_DETAIL_TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tournament-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tournament-panel-${tab.id}`}
            onMouseDown={preventTabFocusScroll}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                : "border border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-text-primary",
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab panels — kept mounted to avoid layout jumps */}
      <div className="pb-4">
        <TabPanel id="overview" activeTab={activeTab}>
          <OverviewPanel />
        </TabPanel>
        <TabPanel id="matches" activeTab={activeTab}>
          <MatchesPanel />
        </TabPanel>
        <TabPanel id="squads" activeTab={activeTab}>
          <SquadsPanel />
        </TabPanel>
        <TabPanel id="leaderboard" activeTab={activeTab}>
          <LeaderboardPanel />
        </TabPanel>
        <TabPanel id="officials" activeTab={activeTab}>
          <OfficialsPanel />
        </TabPanel>
        <TabPanel id="info" activeTab={activeTab}>
          <InfoPanel tournament={tournament} />
        </TabPanel>
      </div>
    </>
  );
}
