import { MapPin, Signpost, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { tournamentFieldClassName } from "@/components/tournament/FormFields";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  TOURNAMENT_FORM_DIALOG,
  tournamentDialogClass,
} from "@/components/tournament/dialog-styles";
import type { Ground } from "@/lib/tournament-store";

const inputClassName = cn(tournamentFieldClassName, "pl-10");

export type NewGroundInput = Omit<Ground, "id" | "tournamentId" | "createdAt">;

interface CreateGroundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (ground: NewGroundInput) => void;
}

export function CreateGroundDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateGroundDialogProps) {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const resetForm = () => {
    setTitle("");
    setAddress("");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  const canSubmit = title.trim() && address.trim();

  const handleCreate = () => {
    if (!canSubmit) return;
    onCreate({
      title: title.trim(),
      address: address.trim(),
    });
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={tournamentDialogClass(
          TOURNAMENT_FORM_DIALOG,
          "[&_.dialog-glow-scroll]:max-h-[92vh] [&_.dialog-glow-scroll]:p-5 [&_.dialog-glow-scroll]:sm:p-8",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <DialogTitle className="font-display text-lg font-bold text-text-primary">
            Add Ground
          </DialogTitle>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Close"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary shadow-[var(--shadow-sm)] transition-all hover:border-primary/35 hover:text-text-primary"
          >
            <X className="h-4 w-4 group-hover:scale-110 transition-transform" strokeWidth={2.25} />
          </button>
        </div>

        <p className="text-sm text-text-secondary">
          Register a new venue for your tournament matches.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Signpost className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ground title"
              className={inputClassName}
            />
          </div>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ground address"
              className={inputClassName}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          disabled={!canSubmit}
          className="w-full rounded-xl py-3 text-sm font-bold text-primary-foreground btn-cta disabled:opacity-50 disabled:pointer-events-none"
        >
          Add Ground
        </button>
      </DialogContent>
    </Dialog>
  );
}
