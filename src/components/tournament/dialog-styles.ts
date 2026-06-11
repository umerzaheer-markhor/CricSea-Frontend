import { cn } from "@/lib/utils";

/** Selection modals — wider on desktop, full-width on mobile. */
export const TOURNAMENT_SELECT_DIALOG =
  "w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl";

/** Create / form modals */
export const TOURNAMENT_FORM_DIALOG = "w-full max-w-xl sm:max-w-2xl md:max-w-3xl";

/** Shared tournament dialog overrides — hides default shadcn close button. */
export function tournamentDialogClass(...extra: (string | undefined | false)[]) {
  return cn("[&_.dialog-glow-scroll>button.absolute]:hidden", ...extra);
}
