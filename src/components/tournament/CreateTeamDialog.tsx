import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { FormField, tournamentFieldClassName } from "@/components/tournament/FormFields";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tournamentDialogClass } from "@/components/tournament/dialog-styles";
import type { Team } from "@/lib/tournament-store";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

const TEAM_LEVELS = [
  "Under 10",
  "Under 16",
  "Under 19",
  "Club Level",
  "School Level",
  "University Level",
  "First Class",
  "Twenty 20 Internationals",
  "One Day International",
  "National",
] as const;

export type NewTeamInput = Omit<Team, "id" | "tournamentId" | "playerCount" | "createdAt">;

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (team: NewTeamInput) => void;
}

export function CreateTeamDialog({ open, onOpenChange, onCreate }: CreateTeamDialogProps) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [teamLevel, setTeamLevel] = useState("");
  const [location, setLocation] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName("");
    setShortName("");
    setDisplayName("");
    setSlogan("");
    setTeamLevel("");
    setLocation("");
    setBannerPreview(null);
    setLogoPreview(null);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setter(URL.createObjectURL(file));
  };

  const canSubmit =
    name.trim() && shortName.trim() && displayName.trim() && teamLevel && location.trim();

  const handleCreate = () => {
    if (!canSubmit) return;
    onCreate({
      name: name.trim(),
      shortName: shortName.trim(),
      displayName: displayName.trim(),
      slogan: slogan.trim(),
      teamLevel,
      location: location.trim(),
      bannerUrl: bannerPreview ?? undefined,
      logoUrl: logoPreview ?? undefined,
    });
    resetForm();
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={tournamentDialogClass(
          "max-w-3xl [&_.dialog-glow-scroll]:max-h-[92vh] [&_.dialog-glow-scroll]:gap-0 [&_.dialog-glow-scroll]:p-5 [&_.dialog-glow-scroll]:sm:p-8",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src={fireball} alt="" className="h-6 w-auto shrink-0 sm:h-7" />
            <DialogTitle className="font-display text-lg font-bold text-text-primary sm:text-xl">
              Create Team
            </DialogTitle>
          </div>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Close"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface/80 text-text-secondary shadow-[var(--shadow-sm)] backdrop-blur-sm transition-all duration-200 hover:border-primary/35 hover:bg-surface hover:text-text-primary hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.25} />
          </button>
        </div>

        <p className="text-sm text-text-secondary">
          Register your team and collaborate, showcase skills, and compete with top participants.
        </p>

        <section className="relative pt-2">
          <button
            type="button"
            onClick={() => bannerInputRef.current?.click()}
            className="group relative flex h-36 sm:h-44 w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-secondary transition-colors hover:border-primary/30"
          >
            {bannerPreview ? (
              <img src={bannerPreview} alt="Team banner" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2">
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
            onClick={() => logoInputRef.current?.click()}
            className="group absolute -bottom-8 left-4 z-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-surface-secondary shadow-[var(--shadow-md)] transition-colors hover:border-primary/30"
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Team logo" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 px-1 text-center">
                <ImagePlus className="h-5 w-5 text-text-secondary group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-medium leading-tight text-text-secondary group-hover:text-primary transition-colors">
                  Add Logo
                </span>
              </div>
            )}
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, setLogoPreview)}
          />
        </section>

        <div className="grid grid-cols-1 gap-5 overflow-visible pt-10 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
          <FormField label="Team name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team name"
              className={tournamentFieldClassName}
            />
          </FormField>
          <FormField label="Short name">
            <Input
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder="Enter short name"
              className={tournamentFieldClassName}
            />
          </FormField>
          <FormField label="Display name">
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter display name"
              className={tournamentFieldClassName}
            />
          </FormField>
          <FormField label="Slogan">
            <Input
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Enter slogan"
              className={tournamentFieldClassName}
            />
          </FormField>
          <FormField label="Choose team level">
            <Select value={teamLevel} onValueChange={setTeamLevel}>
              <SelectTrigger className={tournamentFieldClassName}>
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Location">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className={tournamentFieldClassName}
            />
          </FormField>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          disabled={!canSubmit}
          className="mt-6 rounded-xl px-10 py-3 text-sm font-bold text-primary-foreground btn-cta disabled:opacity-50 disabled:pointer-events-none"
        >
          Create Team
        </button>
      </DialogContent>
    </Dialog>
  );
}
