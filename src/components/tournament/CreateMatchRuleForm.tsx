import { X } from "lucide-react";
import { useState } from "react";
import { tournamentFieldClassName } from "@/components/tournament/FormFields";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

type RuleFormat = "limited" | "test";

export type NewMatchRule = {
  title: string;
  description: string;
  format: RuleFormat;
};

interface CreateMatchRuleFormProps {
  onBack: () => void;
  onCreate: (rule: NewMatchRule) => void;
}

export function CreateMatchRuleForm({ onBack, onCreate }: CreateMatchRuleFormProps) {
  const [format, setFormat] = useState<RuleFormat>("limited");
  const [ruleName, setRuleName] = useState("");
  const [inningsOvers, setInningsOvers] = useState("");
  const [matchDays, setMatchDays] = useState("");
  const [perDayOvers, setPerDayOvers] = useState("");

  const canSubmit =
    ruleName.trim() &&
    (format === "limited" ? inningsOvers.trim() : matchDays.trim() && perDayOvers.trim());

  const handleCreate = () => {
    if (!canSubmit) return;

    const title = ruleName.trim();
    const description =
      format === "limited"
        ? `Limited Over rule (${inningsOvers.trim()} Ov)`
        : `Test format (${matchDays.trim()} days, ${perDayOvers.trim()} ov/day)`;

    onCreate({ title, description, format });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src={fireball} alt="" className="h-6 w-auto shrink-0 sm:h-7" />
          <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">Create New Rule</h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          aria-label="Close"
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary shadow-[var(--shadow-sm)] backdrop-blur-sm transition-all duration-200 hover:border-primary/35 hover:bg-surface hover:text-text-primary hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <X className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.25} />
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface-secondary/60 p-5 sm:p-6 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-text-secondary">Format</Label>
          <div className="grid grid-cols-2 gap-3">
            {(["limited", "test"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormat(option)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                  format === option
                    ? "border-primary bg-primary text-primary-foreground glow-primary"
                    : "border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-primary",
                )}
              >
                {option === "limited" ? "Limited overs" : "Test"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-text-primary">Rule name</Label>
          <Input
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            placeholder="Rule name (e.g. Club T20)"
            className={tournamentFieldClassName}
          />
        </div>

        {format === "limited" ? (
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-text-primary">Innings overs</Label>
            <Input
              type="number"
              min={1}
              value={inningsOvers}
              onChange={(e) => setInningsOvers(e.target.value)}
              placeholder="Innings overs"
              className={tournamentFieldClassName}
            />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-text-primary">Match days</Label>
              <Input
                type="number"
                min={1}
                value={matchDays}
                onChange={(e) => setMatchDays(e.target.value)}
                placeholder="Match days"
                className={tournamentFieldClassName}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-text-primary">Per day overs</Label>
              <Input
                type="number"
                min={1}
                value={perDayOvers}
                onChange={(e) => setPerDayOvers(e.target.value)}
                placeholder="Per day overs"
                className={tournamentFieldClassName}
              />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleCreate}
          disabled={!canSubmit}
          className="rounded-xl px-8 py-3 text-sm font-bold text-primary-foreground btn-cta disabled:opacity-50 disabled:pointer-events-none"
        >
          Create Rule
        </button>
      </div>
    </div>
  );
}
