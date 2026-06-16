import graduate from "@/assets/graduate.png";
import { TOURNAMENT_OFFICIALS } from "@/lib/tournament-detail-data";
import { DetailCard, PanelHeading } from "./shared";

export function OfficialsPanel() {
  return (
    <section className="space-y-6">
      <PanelHeading>Assigned Officials</PanelHeading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TOURNAMENT_OFFICIALS.map((official) => (
          <DetailCard key={official.id} className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/15 bg-gradient-to-br from-primary/15 to-surface-secondary p-2 transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-primary/35 group-hover/card:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]">
              <img src={graduate} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-base font-bold text-text-primary">{official.name}</p>
              <p className="text-sm font-semibold text-primary">{official.role}</p>
              <p className="mt-0.5 truncate text-sm text-text-secondary transition-colors duration-300 group-hover/card:text-text-primary">
                {official.email}
              </p>
            </div>
          </DetailCard>
        ))}
      </div>
    </section>
  );
}
