import { useState } from "react";
import coach from "@/assets/coach.png";
import {
  leaderboardForCategory,
  type LeaderboardCategory,
} from "@/lib/tournament-detail-data";
import { cn } from "@/lib/utils";
import { DetailCard, PanelHeading, StatPill, SubTabBar } from "./shared";

const LEADERBOARD_TABS: { id: LeaderboardCategory; label: string }[] = [
  { id: "batting", label: "Batting" },
  { id: "bowling", label: "Bowling" },
  { id: "fielding", label: "Fielding" },
];

function rankClass(rank: number) {
  if (rank === 1) return "text-primary";
  if (rank === 2) return "text-text-primary";
  return "text-text-secondary";
}

export function LeaderboardPanel() {
  const [category, setCategory] = useState<LeaderboardCategory>("batting");
  const players = leaderboardForCategory(category);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PanelHeading>Leaderboard</PanelHeading>
        <SubTabBar tabs={LEADERBOARD_TABS} active={category} onChange={setCategory} />
      </div>

      <div className="space-y-4">
        {players.map((player) => (
          <DetailCard key={player.id}>
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-primary/15 bg-gradient-to-br from-primary/10 to-surface-secondary transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-primary/30 sm:h-16 sm:w-16">
                <img src={coach} alt="" className="h-full w-full object-cover object-top" />
                {player.rank === 1 && (
                  <div
                    aria-hidden
                    className="absolute inset-0 ring-2 ring-primary/35 ring-inset"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-text-primary">
                      {player.name}
                    </p>
                    <p className="text-sm font-semibold text-primary">{player.team}</p>
                  </div>
                  <span
                    className={cn(
                      "font-display text-2xl font-bold tabular-nums sm:text-3xl",
                      rankClass(player.rank),
                    )}
                  >
                    {String(player.rank).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {player.stats.map((stat, index) => (
                    <StatPill
                      key={stat.label}
                      label={stat.label}
                      value={stat.value}
                      highlight={index === 2}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DetailCard>
        ))}
      </div>
    </section>
  );
}
