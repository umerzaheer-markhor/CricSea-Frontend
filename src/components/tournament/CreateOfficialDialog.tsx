import { Building2, ImagePlus, Mail, UserRound, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { tournamentFieldClassName } from "@/components/tournament/FormFields";
import { Input } from "@/components/ui/input";
import {
  TOURNAMENT_FORM_DIALOG,
  tournamentDialogClass,
} from "@/components/tournament/dialog-styles";
import type { Official } from "@/lib/tournament-store";
import { cn } from "@/lib/utils";

const inputClassName = cn(tournamentFieldClassName, "pl-10");

export type NewOfficialInput = Omit<Official, "id" | "tournamentId" | "createdAt">;

interface CreateOfficialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: string;
  onCreate: (official: NewOfficialInput) => void;
}

export function CreateOfficialDialog({
  open,
  onOpenChange,
  role,
  onCreate,
}: CreateOfficialDialogProps) {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFullName("");
    setCity("");
    setEmail("");
    setPhotoPreview(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  const canSubmit = fullName.trim() && city.trim() && email.trim();

  const handleCreate = () => {
    if (!canSubmit) return;
    onCreate({
      fullName: fullName.trim(),
      city: city.trim(),
      email: email.trim(),
      role,
      photoUrl: photoPreview ?? undefined,
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
            Create Official
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
          Adding as <span className="font-semibold text-primary">{role}</span>
        </p>

        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          className="group mx-auto flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface-secondary transition-colors hover:border-primary/35"
        >
          {photoPreview ? (
            <img src={photoPreview} alt="" className="h-full w-full rounded-2xl object-cover" />
          ) : (
            <>
              <ImagePlus className="h-8 w-8 text-text-secondary group-hover:text-primary transition-colors" />
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary transition-colors">
                Add
              </span>
            </>
          )}
        </button>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPhotoPreview(URL.createObjectURL(file));
          }}
        />

        <div className="space-y-4">
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className={inputClassName}
            />
          </div>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className={inputClassName}
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          Create Official
        </button>
      </DialogContent>
    </Dialog>
  );
}
