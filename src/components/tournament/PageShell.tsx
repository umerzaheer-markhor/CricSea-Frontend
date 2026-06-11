import type { ReactNode } from "react";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { cn } from "@/lib/utils";

export function TournamentPageShell({
  children,
  fillViewport = false,
}: {
  children: ReactNode;
  fillViewport?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-clip bg-background mesh-bg",
        fillViewport && "flex min-h-full flex-1 flex-col",
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BackgroundGlow />
      </div>
      <div className={cn("relative", fillViewport && "flex flex-1 flex-col")}>{children}</div>
    </div>
  );
}
