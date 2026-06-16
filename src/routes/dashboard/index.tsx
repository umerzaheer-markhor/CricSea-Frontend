import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlusSquare, UserPlus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Organizer Dashboard — CricSea" },
      { name: "description", content: "Manage tournaments, teams, and players from your CricSea organizer dashboard." },
    ],
  }),
  component: DashboardPage,
});

const QUICK_STATS = [
  { label: "Tournaments", value: "0" },
  { label: "Teams", value: "0" },
  { label: "Live Matches", value: "0" },
] as const;

const ACTIONS = [
  {
    title: "Create Tournament",
    description: "Set up formats, draws, officials, and grounds for your event.",
    to: "/create-tournament" as const,
    icon: PlusSquare,
  },
  {
    title: "Create Teams",
    description: "Register squads with logos, levels, and player rosters.",
    to: "/create-tournament" as const,
    icon: Users,
  },
  {
    title: "Create Player",
    description: "Add player profiles and assign them to your club squads.",
    to: "/create-tournament" as const,
    icon: UserPlus,
  },
] as const;

function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
        <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-surface to-surface p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary blur-2xl animate-green-glow opacity-30"
          />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <img src={fireball} alt="" className="mt-0.5 h-7 w-auto" />
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
                  Welcome back, David
                </h2>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                  Your command center for tournaments, teams, and match-day operations — all in one place.
                </p>
              </div>
            </div>
            <Link
              to="/create-tournament"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground btn-cta"
            >
              New Tournament
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl px-5 py-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_24px_-8px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-text-primary">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="space-y-5">
          <div>
            <h3 className="font-display text-lg font-bold text-text-primary">Quick actions</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Jump straight into the workflows you use most as an organizer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.to}
                  className={cn(
                    "glass-card hover-lift group flex flex-col items-center rounded-2xl p-8 text-center",
                    "transition-all hover:border-primary/30",
                  )}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[var(--shadow-glow)] group-hover:animate-pulse-glow">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <h4 className="mt-5 font-display text-base font-bold text-text-primary">
                    {action.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {action.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Get started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-border bg-surface-secondary/50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-text-secondary">
            Start with <span className="font-semibold text-primary">Create Tournament</span> to unlock
            teams, officials, grounds, and draw setup in your workflow.
          </p>
        </section>
      </div>
  );
}
