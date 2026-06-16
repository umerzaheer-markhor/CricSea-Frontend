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
        "relative flex w-full flex-1 flex-col overflow-x-clip bg-background mesh-bg min-h-0",
        fillViewport && "min-h-full",
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BackgroundGlow bottomGlow={false} />
      </div>
      <div className={cn("relative", fillViewport && "flex flex-1 flex-col")}>{children}</div>
    </div>
  );
}
