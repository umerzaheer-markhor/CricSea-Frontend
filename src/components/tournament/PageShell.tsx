import type { ReactNode } from "react";
import { BackgroundGlow } from "@/components/BackgroundGlow";

export function TournamentPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background mesh-bg flex flex-col">
      <BackgroundGlow />
      {children}
    </div>
  );
}
