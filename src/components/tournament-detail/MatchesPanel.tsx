import { useState } from "react";
import { Calendar } from "lucide-react";
import graduate from "@/assets/graduate.png";
import {
  matchesForResultTab,
  type MatchResultTab,
} from "@/lib/tournament-detail-data";
import { cn } from "@/lib/utils";
import {
  DetailCard,
  EmptyState,
  LiveBadge,
  PanelHeading,
  SubTabBar,
  TeamAvatar,
} from "./shared";

const MATCH_TABS: { id: MatchResultTab; label: string }[] = [
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "result", label: "Result" },
];

export function MatchesPanel() {
  const [subTab, setSubTab] = useState<MatchResultTab>("live");
  const matches = matchesForResultTab(subTab);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PanelHeading>Matches</PanelHeading>
        <SubTabBar tabs={MATCH_TABS} active={subTab} onChange={setSubTab} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {matches.length > 0 ? (
          matches.map((match) => (
            <DetailCard key={match.id}>
              {subTab === "live" && (
                <div className="mb-3 flex justify-center">
                  <LiveBadge />
                </div>
              )}

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
                <TeamAvatar code={match.teamA.code} src={graduate} />

                <div className="text-center">
                  <p className="font-display text-3xl font-bold tabular-nums tracking-tight text-text-primary sm:text-4xl">
                    {match.teamA.score}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-primary/80">{match.teamA.overs}</p>
                  <div className="mt-3 space-y-1 rounded-xl border border-primary/10 bg-primary/[0.05] px-3 py-2 text-xs text-text-muted">
                    <p>
                      1st{" "}
                      <span className="font-semibold text-text-primary">{match.innings.first}</span>
                    </p>
                    <p>
                      2nd{" "}
                      <span className="font-semibold text-text-primary">{match.innings.second}</span>
                    </p>
                  </div>
                </div>

                <TeamAvatar code={match.teamB.code} src={graduate} />
              </div>

              <p
                className={cn(
                  "mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold transition-colors duration-300",
                  subTab === "live" ? "text-primary" : "text-text-secondary",
                )}
              >
                <Calendar className="h-4 w-4 shrink-0" />
                {match.datetime}
              </p>
            </DetailCard>
          ))
        ) : (
          <DetailCard interactive={false} className="col-span-full">
            <EmptyState>No {subTab} matches at the moment.</EmptyState>
          </DetailCard>
        )}
      </div>
    </section>
  );
}
