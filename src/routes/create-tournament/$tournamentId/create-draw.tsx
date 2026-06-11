import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FormField, tournamentFieldClassName } from "@/components/tournament/FormFields";
import { MatchLevelPicker } from "@/components/tournament/MatchLevelPicker";
import { MatchRulePicker } from "@/components/tournament/MatchRulePicker";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { Input } from "@/components/ui/input";
import { createDraw, getTournament, type Tournament } from "@/lib/tournament-store";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/create-tournament/$tournamentId/create-draw")({
  head: () => ({
    meta: [
      { title: "Create Draw — CricSea" },
      { name: "description", content: "Add a draw and rounds to your tournament." },
    ],
  }),
  component: CreateDrawPage,
});

function CreateDrawPage() {
  const { tournamentId } = Route.useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const [drawName, setDrawName] = useState("");
  const [matchLevel, setMatchLevel] = useState<string>("");
  const [matchRules, setMatchRules] = useState<string>("");
  const [matchLevelPickerOpen, setMatchLevelPickerOpen] = useState(false);
  const [matchRulePickerOpen, setMatchRulePickerOpen] = useState(false);

  useEffect(() => {
    const found = getTournament(tournamentId);
    if (!found) {
      navigate({ to: "/create-tournament" });
      return;
    }
    setTournament(found);
  }, [tournamentId, navigate]);

  const handleNext = () => {
    if (!drawName.trim() || !matchLevel || !matchRules) return;

    createDraw(tournamentId, {
      name: drawName.trim(),
      matchRules,
      matchLevel,
    });

    navigate({
      to: "/create-tournament/$tournamentId/teams",
      params: { tournamentId },
    });
  };

  if (!tournament) return null;

  return (
    <TournamentPageShell>
      <main className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <section className="space-y-8 animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-7 w-auto" />
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Create Draw</h1>
          </div>

          <div className="grid grid-cols-1 gap-5 overflow-visible sm:grid-cols-2 md:gap-x-6">
            <FormField label="Draw name">
              <Input
                value={drawName}
                onChange={(e) => setDrawName(e.target.value)}
                placeholder="Enter draw name"
                className={tournamentFieldClassName}
              />
            </FormField>

            <FormField label="Select match level">
              <button
                type="button"
                onClick={() => setMatchLevelPickerOpen(true)}
                className={cn(
                  tournamentFieldClassName,
                  "flex items-center justify-between gap-2 px-3 text-sm transition-colors hover:border-primary/30",
                  !matchLevel && "text-text-muted",
                )}
              >
                <span className={matchLevel ? "font-medium text-text-primary" : "text-text-muted"}>
                  {matchLevel || "Select"}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
              </button>
              <MatchLevelPicker
                open={matchLevelPickerOpen}
                onOpenChange={setMatchLevelPickerOpen}
                value={matchLevel}
                onSelect={setMatchLevel}
              />
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Match rules">
                <button
                  type="button"
                  onClick={() => setMatchRulePickerOpen(true)}
                  className={cn(
                    tournamentFieldClassName,
                    "flex items-center justify-between gap-2 px-3 text-sm transition-colors hover:border-primary/30",
                    !matchRules && "text-text-muted",
                  )}
                >
                  <span className={matchRules ? "font-medium text-text-primary" : "text-text-muted"}>
                    {matchRules || "Select"}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </button>
                <MatchRulePicker
                  open={matchRulePickerOpen}
                  onOpenChange={setMatchRulePickerOpen}
                  value={matchRules}
                  onSelect={setMatchRules}
                />
              </FormField>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!drawName.trim() || !matchLevel || !matchRules}
            className="rounded-xl px-10 py-3 text-sm font-bold text-primary-foreground btn-cta disabled:opacity-50 disabled:pointer-events-none"
          >
            Next
          </button>
        </section>
      </main>
    </TournamentPageShell>
  );
}
