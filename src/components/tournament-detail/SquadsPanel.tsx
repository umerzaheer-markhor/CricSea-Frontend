import { ChevronRight } from "lucide-react";
import coach from "@/assets/coach.png";
import { HorizontalScrollStrip } from "@/components/cricket/HorizontalScrollStrip";
import { TOURNAMENT_SQUADS } from "@/lib/tournament-detail-data";
import { DetailCard, PanelHeading } from "./shared";

export function SquadsPanel() {
  return (
    <section className="space-y-8">
      <PanelHeading>Squads</PanelHeading>

      {TOURNAMENT_SQUADS.map((team) => (
        <div key={team.id} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 pb-3">
            <h3 className="font-display text-base font-bold text-text-primary sm:text-lg">
              {team.name}{" "}
              <span className="font-medium text-text-secondary">({team.playerCount} Players)</span>
            </h3>
            <button
              type="button"
              className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 hover:gap-2 hover:text-primary-hover"
            >
              View all
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
            </button>
          </div>

          <HorizontalScrollStrip cardClassName="snap-start shrink-0 w-[9.5rem] sm:w-[10.5rem]">
            {team.players.map((player) => (
              <DetailCard
                key={player.id}
                className="flex h-full flex-col items-center p-3 text-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-primary/15 bg-gradient-to-b from-primary/10 to-surface-secondary transition-transform duration-300 group-hover/card:scale-[1.03]">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  />
                  <img
                    src={coach}
                    alt=""
                    className="relative h-full w-full object-cover object-top"
                  />
                </div>
                <p className="mt-3 line-clamp-1 w-full text-sm font-bold text-text-primary">
                  {player.name}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-primary">{player.role}</p>
              </DetailCard>
            ))}
          </HorizontalScrollStrip>
        </div>
      ))}
    </section>
  );
}
