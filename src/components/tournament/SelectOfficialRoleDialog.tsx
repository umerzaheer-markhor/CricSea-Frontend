import { MapPin, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateOfficialDialog } from "@/components/tournament/CreateOfficialDialog";
import {
  TOURNAMENT_SELECT_DIALOG,
  tournamentDialogClass,
} from "@/components/tournament/dialog-styles";
import { SelectionCard } from "@/components/tournament/SelectionCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { OfficialRole } from "@/lib/official-roles";
import {
  findSampleOfficial,
  getSampleOfficialsForRole,
} from "@/lib/sample-officials";
import {
  clearOfficialAssignment,
  createOfficial,
  getOfficialAssignments,
  getOfficialsForTournament,
  setOfficialAssignment,
  type Official,
} from "@/lib/tournament-store";

interface SelectOfficialRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentId: string;
  role: OfficialRole | null;
  onAssignmentChange?: () => void;
}

function OfficialPersonCard({
  official,
  role,
  selected,
  preview = false,
  onSelect,
}: {
  official: Official;
  role: string;
  selected: boolean;
  preview?: boolean;
  onSelect: () => void;
}) {
  const initials = official.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <SelectionCard
      selected={selected}
      preview={preview}
      onClick={onSelect}
      avatar={
        official.photoUrl ? (
          <img src={official.photoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white via-surface to-surface-secondary dark:from-surface-elevated dark:via-surface dark:to-surface-secondary">
            <span className="font-display text-xl font-bold tracking-tight text-primary">{initials}</span>
          </div>
        )
      }
      title={official.fullName}
      subtitle={official.email}
      badges={
        <span className="inline-flex rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/15">
          {role}
        </span>
      }
      footerLeft={
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-primary">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-3.5 w-3.5" />
          </span>
          <span className="truncate">{official.city}</span>
        </div>
      }
      footerRight={
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Official
          </p>
          <p className="font-display text-sm font-bold leading-tight text-text-primary">Active</p>
        </div>
      }
    />
  );
}

export function SelectOfficialRoleDialog({
  open,
  onOpenChange,
  tournamentId,
  role,
  onAssignmentChange,
}: SelectOfficialRoleDialogProps) {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (!open || !role) return;
    const list = getOfficialsForTournament(tournamentId, role);
    setOfficials(list);
    const assignments = getOfficialAssignments(tournamentId);
    setSelectedId(assignments[role] ?? null);
  }, [open, role, tournamentId]);

  const refresh = () => {
    if (!role) return;
    setOfficials(getOfficialsForTournament(tournamentId, role));
    onAssignmentChange?.();
  };

  const isSelected = (officialId: string, email?: string) => {
    if (selectedId === officialId) return true;
    if (!selectedId || !email) return false;
    const assigned = officials.find((o) => o.id === selectedId);
    return assigned?.email === email;
  };

  const handleSelect = (officialId: string) => {
    if (!role) return;

    let id = officialId;

    if (officialId.startsWith("sample-")) {
      const sample = findSampleOfficial(role, officialId);
      if (!sample) return;
      const existing = officials.find(
        (o) => o.email === sample.email && o.role === sample.role,
      );
      if (existing) {
        id = existing.id;
      } else {
        const created = createOfficial(tournamentId, {
          fullName: sample.fullName,
          email: sample.email,
          city: sample.city,
          role: sample.role,
        });
        id = created.id;
        setOfficials((prev) => [...prev, created]);
      }
    }

    if (selectedId === id) {
      setSelectedId(null);
      clearOfficialAssignment(tournamentId, role);
      onAssignmentChange?.();
      return;
    }

    setSelectedId(id);
    setOfficialAssignment(tournamentId, role, id);
    onAssignmentChange?.();
  };

  const handleCreate = (input: Parameters<typeof createOfficial>[1]) => {
    const created = createOfficial(tournamentId, input);
    setOfficials((prev) => [...prev, created]);
    handleSelect(created.id);
    refresh();
  };

  const handleContinue = () => {
    onOpenChange(false);
  };

  if (!role) return null;

  const sampleOfficials = officials.length === 0 ? getSampleOfficialsForRole(role) : [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={tournamentDialogClass(
            TOURNAMENT_SELECT_DIALOG,
            "[&_.dialog-glow-scroll]:gap-0 [&_.dialog-glow-scroll]:p-0",
          )}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
            <DialogTitle className="font-display text-base font-bold text-text-primary sm:text-lg">
              Select {role}
            </DialogTitle>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-3">
            {sampleOfficials.length > 0
              ? sampleOfficials.map((sample) => (
                  <OfficialPersonCard
                    key={sample.id}
                    official={{ ...sample, tournamentId, createdAt: "" }}
                    role={role}
                    selected={isSelected(sample.id, sample.email)}
                    preview
                    onSelect={() => handleSelect(sample.id)}
                  />
                ))
              : officials.map((official) => (
                  <OfficialPersonCard
                    key={official.id}
                    official={official}
                    role={role}
                    selected={selectedId === official.id}
                    onSelect={() => handleSelect(official.id)}
                  />
                ))}
          </div>

          <div className="shrink-0 border-t border-border bg-surface-secondary/30 px-5 py-4 sm:px-6">
            <div className="flex items-stretch gap-3">
              <button
                type="button"
                onClick={handleContinue}
                className="min-h-12 flex-1 rounded-xl py-3 text-sm font-bold text-primary-foreground btn-cta"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                aria-label="Add official"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-105 hover:shadow-[var(--shadow-glow-hover)]"
              >
                <Plus className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CreateOfficialDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        role={role}
        onCreate={handleCreate}
      />
    </>
  );
}
