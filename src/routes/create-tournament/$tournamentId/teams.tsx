import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Search, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CreateTeamDialog } from "@/components/tournament/CreateTeamDialog";
import { SelectionCard } from "@/components/tournament/SelectionCard";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { Input } from "@/components/ui/input";
import {
  createTeam,
  getSelectedTeamIds,
  getTeamsForTournament,
  getTournament,
  setSelectedTeamIds,
  type Team,
  type Tournament,
} from "@/lib/tournament-store";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/create-tournament/$tournamentId/teams")({
  head: () => ({
    meta: [
      { title: "Teams — CricSea" },
      { name: "description", content: "Add and manage teams for your tournament." },
    ],
  }),
  component: TeamsPage,
});

const SAMPLE_TEAMS: Pick<
  Team,
  "id" | "name" | "shortName" | "location" | "playerCount" | "teamLevel"
>[] = [
  {
    id: "sample-hammad",
    name: "Team Hammad",
    shortName: "TH",
    location: "Lahore",
    playerCount: 15,
    teamLevel: "Club Level",
  },
  {
    id: "sample-umer",
    name: "Team Umer",
    shortName: "TU",
    location: "Lahore",
    playerCount: 12,
    teamLevel: "School Level",
  },
  {
    id: "sample-ali",
    name: "Team Ali",
    shortName: "TA",
    location: "Karachi",
    playerCount: 11,
    teamLevel: "University Level",
  },
];

type TeamCardData = Pick<
  Team,
  "id" | "name" | "shortName" | "location" | "playerCount" | "logoUrl" | "teamLevel"
>;

function TeamLogo({ logoUrl, initials }: { logoUrl?: string; initials: string }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white via-surface to-surface-secondary dark:from-surface-elevated dark:via-surface dark:to-surface-secondary">
      <span className="font-display text-xl font-bold tracking-tight text-primary">{initials}</span>
    </div>
  );
}

function TeamCard({
  team,
  sample = false,
  selected = false,
  onToggle,
}: {
  team: TeamCardData;
  sample?: boolean;
  selected?: boolean;
  onToggle: () => void;
}) {
  const initials = team.shortName.slice(0, 2).toUpperCase();

  return (
    <SelectionCard
      selected={selected}
      preview={sample}
      onClick={onToggle}
      avatar={<TeamLogo logoUrl={team.logoUrl} initials={initials} />}
      title={team.name}
      subtitle={team.shortName}
      badges={
        team.teamLevel ? (
          <span className="inline-flex rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/15">
            {team.teamLevel}
          </span>
        ) : undefined
      }
      footerLeft={
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-primary">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-3.5 w-3.5" />
          </span>
          <span className="truncate">{team.location}</span>
        </div>
      }
      footerRight={
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Total Players
          </p>
          <p className="font-display text-lg font-bold leading-tight text-text-primary tabular-nums">
            {team.playerCount}
          </p>
        </div>
      }
    />
  );
}

function AddTeamCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="team-card-glow group flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-primary/35 bg-gradient-to-r from-primary/8 via-transparent to-primary/8 p-4 text-left sm:p-5"
    >
      <span className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[var(--shadow-glow)]">
        <UserPlus className="h-7 w-7" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 border-l border-border/50 pl-4">
        <span className="block font-display text-base font-bold text-text-primary transition-colors group-hover:text-primary">
          Register new team
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
          Add squad details, logo, and location for your tournament
        </span>
      </span>
    </button>
  );
}

function TeamsPage() {
  const { tournamentId } = Route.useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const found = getTournament(tournamentId);
    if (!found) {
      navigate({ to: "/create-tournament" });
      return;
    }
    setTournament(found);
    const storedTeams = getTeamsForTournament(tournamentId);
    setTeams(storedTeams);
    const savedSelection = getSelectedTeamIds(tournamentId);
    if (savedSelection.length > 0) {
      setSelectedIds(new Set(savedSelection));
    }
  }, [tournamentId, navigate]);

  const showingSamples = teams.length === 0;
  const displayTeams = useMemo(
    () => (teams.length > 0 ? teams : SAMPLE_TEAMS),
    [teams],
  );

  const filteredTeams = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return displayTeams;
    return displayTeams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q),
    );
  }, [displayTeams, search]);

  const handleCreateTeam = (input: Parameters<typeof createTeam>[1]) => {
    const team = createTeam(tournamentId, input);
    setTeams((prev) => [...prev, team]);
    setSelectedIds((prev) => new Set(prev).add(team.id));
  };

  const toggleTeamSelection = (teamId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) {
        next.delete(teamId);
      } else {
        next.add(teamId);
      }
      return next;
    });
  };

  const handleConfirmSelection = () => {
    const selectedList = displayTeams.filter((t) => selectedIds.has(t.id));

    if (showingSamples) {
      const created = selectedList.map((sample) =>
        createTeam(tournamentId, {
          name: sample.name,
          shortName: sample.shortName,
          displayName: sample.name,
          slogan: "",
          teamLevel: sample.teamLevel,
          location: sample.location,
        }),
      );
      setSelectedTeamIds(
        tournamentId,
        created.map((t) => t.id),
      );
    } else {
      setSelectedTeamIds(tournamentId, selectedList.map((t) => t.id));
    }

    navigate({
      to: "/create-tournament/$tournamentId/officials",
      params: { tournamentId },
    });
  };

  if (!tournament) return null;

  const selectedCount = selectedIds.size;
  const minTeamsMet = selectedCount >= 3;

  return (
    <TournamentPageShell>
      <main className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-3 animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-7 w-auto" />
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Teams</h1>
              <p className="mt-0.5 text-sm text-text-secondary">
                {selectedCount > 0
                  ? `${selectedCount} selected · pick at least 3 teams`
                  : teams.length > 0
                    ? `${teams.length} team${teams.length === 1 ? "" : "s"} · tap cards to select`
                    : "Tap preview cards to select, or register your own"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 animate-fade-up">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="h-11 rounded-xl border-border bg-surface-secondary pl-10 text-text-primary placeholder:text-text-muted focus-visible:ring-primary/40"
          />
        </div>

        <div className="mt-6 space-y-3 sm:space-y-4 animate-fade-up">
          {filteredTeams.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface-secondary/50 px-6 py-10 text-center">
              <p className="text-sm font-medium text-text-secondary">No teams match your search.</p>
            </div>
          ) : (
            filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                sample={showingSamples}
                selected={selectedIds.has(team.id)}
                onToggle={() => toggleTeamSelection(team.id)}
              />
            ))
          )}
          <AddTeamCard onClick={() => setCreateOpen(true)} />
        </div>

        <div className="mt-8 flex justify-center animate-fade-up">
          <button
            type="button"
            disabled={!minTeamsMet}
            onClick={handleConfirmSelection}
            className={cn(
              "w-full max-w-md rounded-xl px-8 py-3 text-sm font-bold text-primary-foreground btn-cta sm:w-auto",
              !minTeamsMet && "opacity-50 pointer-events-none",
            )}
          >
            {minTeamsMet
              ? `Confirm ${selectedCount} Teams`
              : `Select Teams (${selectedCount}/3)`}
          </button>
        </div>

        <CreateTeamDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreateTeam} />
      </main>
    </TournamentPageShell>
  );
}
