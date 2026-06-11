import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { tournamentDialogClass } from "@/components/tournament/dialog-styles";
import { cn } from "@/lib/utils";

export const MATCH_LEVEL_OPTIONS = [
  "UnOfficial",
  "College",
  "School",
  "Club",
  "Domestic",
  "International",
] as const;

export type MatchLevel = (typeof MATCH_LEVEL_OPTIONS)[number];

interface MatchLevelPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (level: string) => void;
}

export function MatchLevelPicker({ open, onOpenChange, value, onSelect }: MatchLevelPickerProps) {
  const handleSelect = (level: string) => {
    onSelect(level);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={tournamentDialogClass(
          "w-full max-w-lg sm:max-w-xl [&_.dialog-glow-scroll]:gap-0 [&_.dialog-glow-scroll]:p-5 [&_.dialog-glow-scroll]:sm:p-6",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <DialogTitle className="font-display text-lg font-bold text-text-primary sm:text-xl">
            Select Match Level
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MATCH_LEVEL_OPTIONS.map((level) => {
            const selected = value === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => handleSelect(level)}
                className={cn(
                  "rounded-xl border px-4 py-4 text-sm font-semibold transition-all",
                  selected
                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/50"
                    : "border-border bg-surface-secondary text-text-secondary hover:border-primary/30 hover:text-text-primary",
                )}
              >
                {level}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
