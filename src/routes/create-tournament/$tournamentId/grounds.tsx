import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CreateGroundDialog } from "@/components/tournament/CreateGroundDialog";
import { SelectionCard } from "@/components/tournament/SelectionCard";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { findSampleGround, SAMPLE_GROUNDS } from "@/lib/sample-grounds";
import {
  createGround,
  getGroundsForTournament,
  getSelectedGroundIds,
  getTournament,
  setSelectedGroundIds,
  type Ground,
  type Tournament,
} from "@/lib/tournament-store";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/create-tournament/$tournamentId/grounds")({
  head: () => ({
    meta: [
      { title: "Select Ground — CricSea" },
      { name: "description", content: "Choose grounds for your tournament." },
    ],
  }),
  component: GroundsPage,
});

type GroundCardData = Pick<Ground, "id" | "title" | "address">;

function GroundCard({
  ground,
  selected,
  preview = false,
  onToggle,
}: {
  ground: GroundCardData;
  selected: boolean;
  preview?: boolean;
  onToggle: () => void;
}) {
  return (
    <SelectionCard
      selected={selected}
      preview={preview}
      onClick={onToggle}
      avatar={
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-surface to-surface-secondary">
          <MapPin className="h-7 w-7 text-primary" strokeWidth={2} />
        </div>
      }
      title={ground.title}
      subtitle="Venue"
      footerLeft={
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-primary">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-3.5 w-3.5" />
          </span>
          <span className="truncate">{ground.address}</span>
        </div>
      }
      footerRight={
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Ground
          </p>
          <p className="font-display text-sm font-bold leading-tight text-text-primary">Ready</p>
        </div>
      }
    />
  );
}

function GroundsPage() {
  const { tournamentId } = Route.useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [createOpen, setCreateOpen] = useState(false);

  const refresh = () => {
    setGrounds(getGroundsForTournament(tournamentId));
    setSelectedIds(new Set(getSelectedGroundIds(tournamentId)));
  };

  useEffect(() => {
    const found = getTournament(tournamentId);
    if (!found) {
      navigate({ to: "/create-tournament" });
      return;
    }
    setTournament(found);
    refresh();
  }, [tournamentId, navigate]);

  const showingSamples = grounds.length === 0;
  const displayGrounds = useMemo<GroundCardData[]>(
    () => (showingSamples ? SAMPLE_GROUNDS : grounds),
    [showingSamples, grounds],
  );

  const resolveGroundId = (groundId: string): string => {
    if (!groundId.startsWith("sample-")) return groundId;
    const sample = findSampleGround(groundId);
    if (!sample) return groundId;
    const existing = grounds.find(
      (g) => g.title === sample.title && g.address === sample.address,
    );
    if (existing) return existing.id;
    const created = createGround(tournamentId, {
      title: sample.title,
      address: sample.address,
    });
    setGrounds((prev) => [...prev, created]);
    return created.id;
  };

  const toggleGround = (groundId: string) => {
    const id = resolveGroundId(groundId);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setSelectedGroundIds(tournamentId, [...next]);
      return next;
    });
  };

  const handleCreate = (input: Parameters<typeof createGround>[1]) => {
    const created = createGround(tournamentId, input);
    setGrounds((prev) => [...prev, created]);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.add(created.id);
      setSelectedGroundIds(tournamentId, [...next]);
      return next;
    });
  };

  const handleContinue = () => {
    navigate({
      to: "/create-tournament/$tournamentId/created",
      params: { tournamentId },
    });
  };

  if (!tournament) return null;

  const selectedCount = selectedIds.size;

  return (
    <TournamentPageShell>
      <main className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-8">
        <div className="flex items-center gap-3 animate-fade-up">
          <img src={fireball} alt="" className="h-7 w-auto" />
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
              Select Ground
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              {selectedCount > 0
                ? `${selectedCount} ground${selectedCount === 1 ? "" : "s"} selected`
                : showingSamples
                  ? "Tap preview cards to select, or add your own"
                  : "Tap cards to select grounds for your tournament"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3 animate-fade-up">
          {displayGrounds.map((ground) => {
            const resolvedId = ground.id.startsWith("sample-")
              ? grounds.find((g) => g.title === ground.title && g.address === ground.address)?.id ??
                ground.id
              : ground.id;
            const isSelected = selectedIds.has(resolvedId);

            return (
              <GroundCard
                key={ground.id}
                ground={ground}
                preview={showingSamples}
                selected={isSelected}
                onToggle={() => toggleGround(ground.id)}
              />
            );
          })}
        </div>

        <div className="mt-8 animate-fade-up">
          <div className="flex items-stretch gap-3">
            <button
              type="button"
              onClick={handleContinue}
              className="min-h-12 flex-1 rounded-xl py-3 text-sm font-bold text-primary-foreground btn-cta"
            >
              {selectedCount > 0 ? `Continue (${selectedCount})` : "Continue"}
            </button>
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              aria-label="Add ground"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-105 hover:shadow-[var(--shadow-glow-hover)]"
            >
              <Plus className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <CreateGroundDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onCreate={handleCreate}
        />
      </main>
    </TournamentPageShell>
  );
}
