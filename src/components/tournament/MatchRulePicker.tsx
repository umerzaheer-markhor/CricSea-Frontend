import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const MATCH_RULE_OPTIONS = [
  { title: "T 20", description: "Limited Over rule (20 Ov)" },
  { title: "One Day (50 Ov)", description: "Limited Over rule (50 Ov)" },
  { title: "T 10", description: "Limited Over rule (10 Ov)" },
  { title: "T 40", description: "Limited Over rule (40 Ov)" },
  { title: "T 30", description: "Limited Over rule (30 Ov)" },
  { title: "T 17 Overs Match", description: "Limited Over rule (17 Ov)" },
  { title: "Super Over", description: "Tie-breaker super over rule" },
  { title: "2 Days (Test Format)", description: "Two-day test match format" },
  { title: "3 Days (Test Format)", description: "Three-day test match format" },
  { title: "1 Day (4 Innings) & 10 Overs", description: "Four innings with 10 overs each" },
  { title: "20 Overs", description: "Limited Over rule (20 Ov)" },
  { title: "Palenty", description: "Penalty-based match rule" },
  { title: "GUD", description: "Custom GUD match rule" },
] as const;

interface MatchRulePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (rule: string) => void;
}

export function MatchRulePicker({ open, onOpenChange, value, onSelect }: MatchRulePickerProps) {
  const handleSelect = (title: string) => {
    onSelect(title);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90vh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-2xl border-border bg-background p-5 sm:p-8",
          "[&>button.absolute]:hidden",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 sm:gap-3">
            <img src={fireball} alt="" className="h-6 w-auto sm:h-7" />
            <DialogTitle className="font-display text-lg font-bold text-text-primary sm:text-xl">
              Select Match Rule
            </DialogTitle>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-primary-foreground btn-cta sm:px-4 sm:text-sm"
          >
            Add New
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {MATCH_RULE_OPTIONS.map((rule) => {
            const selected = value === rule.title;
            return (
              <button
                key={rule.title}
                type="button"
                onClick={() => handleSelect(rule.title)}
                className={cn(
                  "flex min-h-[88px] flex-col items-start justify-center rounded-xl border px-3 py-4 text-left shadow-sm transition-all hover-lift",
                  selected
                    ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                    : "border-border bg-surface-secondary hover:border-primary/30",
                )}
              >
                <span className="text-sm font-bold text-text-primary">{rule.title}</span>
                <span className="mt-1 text-xs leading-snug text-text-secondary">{rule.description}</span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
