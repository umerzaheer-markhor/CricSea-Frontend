import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectOfficialRoleDialog } from "@/components/tournament/SelectOfficialRoleDialog";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { OFFICIAL_ROLES, type OfficialRole } from "@/lib/official-roles";
import {
  getOfficialAssignments,
  getTournament,
  type Tournament,
} from "@/lib/tournament-store";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/create-tournament/$tournamentId/officials")({
  head: () => ({
    meta: [
      { title: "Select Officials — CricSea" },
      { name: "description", content: "Choose officials for your tournament." },
    ],
  }),
  component: OfficialsPage,
});

function OfficialRoleCard({
  role,
  assigned,
  onOpen,
}: {
  role: OfficialRole;
  assigned: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "glass-card team-card-glow picker-card-glow group relative flex min-h-[5.5rem] w-full flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-300 sm:min-h-[6rem] sm:p-4",
        assigned && "border-primary ring-2 ring-primary/50 card-selected-glow scale-[1.01]",
        !assigned && "hover-lift",
      )}
    >
      <div className="flex w-full items-start justify-between gap-2">
        <span className="text-sm font-bold leading-snug text-text-primary group-hover:text-primary transition-colors sm:text-[0.9rem]">
          {role}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      {assigned ? (
        <span className="mt-2 inline-flex h-6 min-w-6 items-center justify-center self-start rounded-md bg-primary px-2 text-[10px] font-bold text-primary-foreground glow-primary">
          1
        </span>
      ) : (
        <span className="mt-2 text-[10px] font-medium uppercase tracking-wide text-text-muted">
          Tap to assign
        </span>
      )}
    </button>
  );
}

function OfficialsPage() {
  const { tournamentId } = Route.useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [activeRole, setActiveRole] = useState<OfficialRole | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const refreshAssignments = () => {
    setAssignments(getOfficialAssignments(tournamentId));
  };

  useEffect(() => {
    const found = getTournament(tournamentId);
    if (!found) {
      navigate({ to: "/create-tournament" });
      return;
    }
    setTournament(found);
    refreshAssignments();
  }, [tournamentId, navigate]);

  const openRole = (role: OfficialRole) => {
    setActiveRole(role);
    setRoleDialogOpen(true);
  };

  const handleDone = () => {
    navigate({
      to: "/create-tournament/$tournamentId/grounds",
      params: { tournamentId },
    });
  };

  if (!tournament) return null;

  const assignedCount = Object.keys(assignments).length;

  return (
    <TournamentPageShell>
      <main className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-8">
        <div className="flex items-center gap-3 animate-fade-up">
          <img src={fireball} alt="" className="h-7 w-auto" />
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
              Select Officials
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              {assignedCount > 0
                ? `${assignedCount} role${assignedCount === 1 ? "" : "s"} assigned`
                : "Tap a role card to pick or add an official"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4 animate-fade-up">
          {OFFICIAL_ROLES.map((role) => (
            <OfficialRoleCard
              key={role}
              role={role}
              assigned={Boolean(assignments[role])}
              onOpen={() => openRole(role)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center animate-fade-up">
          <button
            type="button"
            onClick={handleDone}
            className="w-full max-w-md rounded-xl px-10 py-3 text-sm font-bold text-primary-foreground btn-cta sm:w-auto"
          >
            {assignedCount > 0 ? `Done (${assignedCount})` : "Done"}
          </button>
        </div>

        <SelectOfficialRoleDialog
          open={roleDialogOpen}
          onOpenChange={setRoleDialogOpen}
          tournamentId={tournamentId}
          role={activeRole}
          onAssignmentChange={refreshAssignments}
        />
      </main>
    </TournamentPageShell>
  );
}
