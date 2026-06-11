import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CreateMatchRuleForm } from "@/components/tournament/CreateMatchRuleForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createCustomMatchRule,
  getCustomMatchRules,
  type CustomMatchRule,
} from "@/lib/tournament-store";
import { tournamentDialogClass } from "@/components/tournament/dialog-styles";
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

type PickerView = "select" | "create";

type RuleCard = {
  id: string;
  title: string;
  description: string;
  custom?: boolean;
};

interface MatchRulePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (rule: string) => void;
}

function toRuleCards(customRules: CustomMatchRule[]): RuleCard[] {
  const builtIn = MATCH_RULE_OPTIONS.map((rule) => ({
    id: rule.title,
    title: rule.title,
    description: rule.description,
  }));
  const custom = customRules.map((rule) => ({
    id: rule.id,
    title: rule.title,
    description: rule.description,
    custom: true,
  }));
  return [...builtIn, ...custom];
}

export function MatchRulePicker({ open, onOpenChange, value, onSelect }: MatchRulePickerProps) {
  const [view, setView] = useState<PickerView>("select");
  const [customRules, setCustomRules] = useState<CustomMatchRule[]>([]);

  useEffect(() => {
    if (open) {
      setCustomRules(getCustomMatchRules());
    } else {
      setView("select");
    }
  }, [open]);

  const allRules = useMemo(() => toRuleCards(customRules), [customRules]);

  const handleSelect = (title: string) => {
    onSelect(title);
    onOpenChange(false);
  };

  const handleCreateRule = (rule: { title: string; description: string; format: "limited" | "test" }) => {
    const created = createCustomMatchRule({
      title: rule.title,
      description: rule.description,
      format: rule.format,
    });
    setCustomRules((prev) => [...prev, created]);
    onSelect(created.title);
    setView("select");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={tournamentDialogClass(
          "max-w-6xl [&_.dialog-glow-scroll]:max-h-[90vh] [&_.dialog-glow-scroll]:gap-0 [&_.dialog-glow-scroll]:p-5 [&_.dialog-glow-scroll]:sm:p-8",
        )}
      >
        {view === "select" ? (
          <>
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
                onClick={() => setView("create")}
                className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-primary-foreground btn-cta sm:px-4 sm:text-sm"
              >
                Add New
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {allRules.map((rule) => {
                const selected = value === rule.title;
                return (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => handleSelect(rule.title)}
                    className={cn(
                      "glass-card picker-card-glow flex min-h-[88px] flex-col items-start justify-center rounded-xl border px-3 py-4 text-left transition-all hover-lift",
                      selected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/50 card-selected-glow scale-[1.02]"
                        : "bg-surface-secondary",
                      rule.custom && "ring-1 ring-primary/20",
                    )}
                  >
                    <span className="text-sm font-bold text-text-primary">{rule.title}</span>
                    <span className="mt-1 text-xs leading-snug text-text-secondary">{rule.description}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <CreateMatchRuleForm onBack={() => setView("select")} onCreate={handleCreateRule} />
        )}
      </DialogContent>
    </Dialog>
  );
}
