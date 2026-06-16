import { CircleDot, Mail, Trophy, User } from "lucide-react";
import type { TournamentListItem } from "@/lib/sample-tournaments";
import { TOURNAMENT_INFO } from "@/lib/tournament-detail-data";
import { DetailCard, IconBadge, PanelHeading } from "./shared";

export function InfoPanel({ tournament }: { tournament: TournamentListItem }) {
  const infoRows = [
    { icon: Trophy, title: "Tournament Name", value: tournament.name },
    { icon: CircleDot, title: "Ball", value: TOURNAMENT_INFO.ball },
  ];

  const contactRows = [
    { icon: User, label: "Created By", value: TOURNAMENT_INFO.createdBy },
    { icon: Mail, label: "Contact Email", value: TOURNAMENT_INFO.contactEmail },
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <PanelHeading>Info</PanelHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {infoRows.map((row) => {
            const Icon = row.icon;
            return (
              <DetailCard key={row.title} className="flex items-center gap-4">
                <IconBadge>
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </IconBadge>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{row.title}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">{row.value}</p>
                </div>
              </DetailCard>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <PanelHeading>Contact Person Details</PanelHeading>
        {contactRows.map((row) => {
          const Icon = row.icon;
          return (
            <DetailCard key={row.label} className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <IconBadge className="h-9 w-9 rounded-lg">
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </IconBadge>
                <span className="text-sm font-semibold text-text-primary">{row.label}</span>
              </div>
              <span className="text-sm text-text-secondary transition-colors duration-300 group-hover/card:text-primary">
                {row.value}
              </span>
            </DetailCard>
          );
        })}
      </div>
    </section>
  );
}
