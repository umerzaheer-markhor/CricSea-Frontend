import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { DatePickerField, FormField } from "@/components/tournament/FormFields";
import { MatchRulePicker } from "@/components/tournament/MatchRulePicker";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const MATCH_LEVELS = ["International", "Domestic", "Club", "School", "Community"] as const;
const STAT_HEADERS = ["Match Played", "Won", "Lost", "Net Run Rate", "Points"] as const;

function CreateDrawPage() {
  const { tournamentId } = Route.useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const [drawName, setDrawName] = useState("");
  const [matchRules, setMatchRules] = useState<string>("");
  const [matchRulePickerOpen, setMatchRulePickerOpen] = useState(false);
  const [matchLevel, setMatchLevel] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    const found = getTournament(tournamentId);
    if (!found) {
      navigate({ to: "/create-tournament" });
      return;
    }
    setTournament(found);
    setStartDate(found.startDate ? new Date(found.startDate) : new Date(2026, 2, 13));
    setEndDate(found.endDate ? new Date(found.endDate) : new Date(2026, 6, 13));
  }, [tournamentId, navigate]);

  const handleNext = () => {
    if (!drawName.trim() || !matchRules || !matchLevel || !startDate || !endDate) return;

    createDraw(tournamentId, {
      name: drawName.trim(),
      matchRules,
      matchLevel,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    navigate({
      to: "/create-tournament/$tournamentId/created",
      params: { tournamentId },
    });
  };

  if (!tournament) return null;

  return (
    <TournamentPageShell>
      <main className="relative mx-auto w-full max-w-3xl flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/create-tournament/$tournamentId/created",
              params: { tournamentId },
            })
          }
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/90 backdrop-blur text-text-secondary shadow-sm hover:bg-surface hover:text-primary hover:border-primary/40 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <section className="space-y-8 animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-7 w-auto" />
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Create Draw</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Draw name">
              <Input
                value={drawName}
                onChange={(e) => setDrawName(e.target.value)}
                placeholder="Enter draw name"
                className="h-11 rounded-xl border-border bg-surface-secondary text-text-primary placeholder:text-text-muted focus-visible:ring-primary/40"
              />
            </FormField>

            <FormField label="Select match level">
              <Select value={matchLevel} onValueChange={setMatchLevel}>
                <SelectTrigger className="h-11 rounded-xl border-border bg-surface-secondary text-text-primary focus:ring-primary/40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {MATCH_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Match rules">
                <button
                  type="button"
                  onClick={() => setMatchRulePickerOpen(true)}
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-xl border border-border bg-surface-secondary px-3 text-sm transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
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

            <FormField label="Start Date">
              <DatePickerField
                date={startDate}
                onSelect={setStartDate}
                placeholder="13 March, 2026"
              />
            </FormField>

            <FormField label="End Date">
              <DatePickerField date={endDate} onSelect={setEndDate} placeholder="13 July, 2026" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {STAT_HEADERS.map((header) => (
              <div
                key={header}
                className="flex items-center justify-center rounded-xl border border-border bg-surface-secondary px-2 py-3 text-center text-xs sm:text-sm font-semibold text-text-secondary"
              >
                {header}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!drawName.trim() || !matchRules || !matchLevel || !startDate || !endDate}
            className="rounded-xl px-10 py-3 text-sm font-bold text-primary-foreground btn-cta disabled:opacity-50 disabled:pointer-events-none"
          >
            Next
          </button>
        </section>
      </main>

      <Footer />
    </TournamentPageShell>
  );
}
