import fireball from "@/assets/fireball.png";
import { STANDINGS_COLS } from "@/lib/tournament-detail-data";
import { GlassPanel, PanelHeading } from "./shared";

export function OverviewPanel() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <img src={fireball} alt="" className="h-7 w-auto animate-float drop-shadow-sm" />
        <PanelHeading>Group A</PanelHeading>
      </div>

      <GlassPanel className="hover-lift">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/15 bg-gradient-to-r from-primary/[0.1] via-primary/[0.06] to-primary/[0.1] text-text-primary">
                <th className="px-5 py-4 text-left font-bold">Team</th>
                {STANDINGS_COLS.map((col) => (
                  <th key={col} className="px-4 py-4 text-center font-bold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={STANDINGS_COLS.length + 1}
                  className="px-5 py-12 text-center text-sm text-text-secondary"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-4 py-2 ring-1 ring-primary/10">
                    No matches played in this pool yet
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </section>
  );
}
