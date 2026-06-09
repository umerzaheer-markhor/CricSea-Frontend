import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
import { Footer } from "@/components/Footer";
import { DatePickerField, FormField } from "@/components/tournament/FormFields";
import { TournamentPageShell } from "@/components/tournament/PageShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTournament } from "@/lib/tournament-store";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/create-tournament/")({
  head: () => ({
    meta: [
      { title: "Create Tournament — CricSea" },
      { name: "description", content: "Set up a new cricket tournament with name, dates, category, and ball type." },
    ],
  }),
  component: CreateTournamentPage,
});

const CATEGORIES = ["Open", "Corporate", "Community", "School", "Other"] as const;

const BALL_TYPES = [
  { id: "leather", label: "Leather Ball", color: "#dc2626" },
  { id: "cork", label: "Cork Ball", color: "#ea580c" },
  { id: "tennis", label: "Tennis Ball", color: "#84cc16" },
  { id: "tape", label: "Tape Ball", color: "#171717" },
] as const;

type Category = (typeof CATEGORIES)[number];
type BallType = (typeof BALL_TYPES)[number]["id"];

function CreateTournamentPage() {
  const navigate = useNavigate();
  const [tournamentName, setTournamentName] = useState("");
  const [shortName, setShortName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2026, 2, 13));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2026, 6, 13));
  const [category, setCategory] = useState<Category>("Open");
  const [ballType, setBallType] = useState<BallType>("leather");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setter(url);
  };

  const handleNext = () => {
    if (!tournamentName.trim() || !shortName.trim() || !startDate || !endDate) return;

    const tournament = createTournament({
      name: tournamentName.trim(),
      shortName: shortName.trim(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      category,
      ballType,
    });

    navigate({
      to: "/create-tournament/$tournamentId/created",
      params: { tournamentId: tournament.id },
    });
  };

  return (
    <TournamentPageShell>
      <main className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 space-y-8">
        <section className="relative animate-fade-up">
          <div className="relative">
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="group relative flex h-44 sm:h-52 w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-secondary transition-colors hover:border-primary/30"
            >
              {bannerPreview ? (
                <img src={bannerPreview} alt="Tournament banner" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-text-muted">
                  <ImagePlus className="h-8 w-8 text-text-secondary group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-text-secondary group-hover:text-primary transition-colors">
                    Choose banner
                  </span>
                </div>
              )}
            </button>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, setBannerPreview)}
            />

            <button
              type="button"
              onClick={() => profileInputRef.current?.click()}
              className="group absolute -bottom-10 left-1/2 z-10 flex h-24 w-24 sm:h-28 sm:w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-surface-secondary shadow-[var(--shadow-md)] transition-colors hover:border-primary/30"
            >
              {profilePreview ? (
                <img src={profilePreview} alt="Tournament logo" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 px-2 text-center">
                  <ImagePlus className="h-6 w-6 text-text-secondary group-hover:text-primary transition-colors" />
                  <span className="text-[10px] sm:text-xs font-medium leading-tight text-text-secondary group-hover:text-primary transition-colors">
                    Add Profile
                  </span>
                </div>
              )}
            </button>
            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, setProfilePreview)}
            />
          </div>
        </section>

        <section className="pt-8 space-y-8 animate-fade-up">
          <div className="flex items-center gap-3">
            <img src={fireball} alt="" className="h-7 w-auto" />
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Create Tournament</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Tournament name">
              <Input
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Enter tournament name"
                className="h-11 rounded-xl border-border bg-surface-secondary text-text-primary placeholder:text-text-muted focus-visible:ring-primary/40"
              />
            </FormField>
            <FormField label="Short name">
              <Input
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                placeholder="Enter short name"
                className="h-11 rounded-xl border-border bg-surface-secondary text-text-primary placeholder:text-text-muted focus-visible:ring-primary/40"
              />
            </FormField>
            <FormField label="Start Date">
              <DatePickerField date={startDate} onSelect={setStartDate} placeholder="13 March, 2026" />
            </FormField>
            <FormField label="End Date">
              <DatePickerField date={endDate} onSelect={setEndDate} placeholder="13 July, 2026" />
            </FormField>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-text-primary">Tournament Category</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                    category === cat
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-surface-secondary text-text-secondary border border-border hover:border-primary/30 hover:text-primary",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-text-primary">Select Ball Type</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BALL_TYPES.map((ball) => (
                <button
                  key={ball.id}
                  type="button"
                  onClick={() => setBallType(ball.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-2xl border px-4 py-5 transition-all",
                    ballType === ball.id
                      ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                      : "border-border bg-surface-secondary hover:border-primary/30",
                  )}
                >
                  <span
                    className="h-10 w-10 rounded-full shadow-sm ring-2 ring-white/20"
                    style={{ backgroundColor: ball.color }}
                  />
                  <span className="text-xs sm:text-sm font-semibold text-text-primary text-center leading-tight">
                    {ball.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!tournamentName.trim() || !shortName.trim() || !startDate || !endDate}
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
