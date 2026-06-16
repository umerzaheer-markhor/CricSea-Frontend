import { createFileRoute, Link } from "@tanstack/react-router";
import { GitBranch, Landmark, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import bat from "@/assets/bat.png";
import cricketBall from "@/assets/cricket-ball.png";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/dashboard/manage-cricket")({
  head: () => ({
    meta: [
      { title: "Manage Cricket — CricSea" },
      { name: "description", content: "Manage matches, tournaments, officials, and grounds from your CricSea dashboard." },
    ],
  }),
  component: ManageCricketPage,
});

const MANAGE_ITEMS = [
  {
    title: "Manage Matches",
    description: "Live scores, squads, and match-day operations.",
    to: "/match" as const,
    icon: "matches" as const,
  },
  {
    title: "Manage Tournament",
    description: "Formats, draws, schedules, and standings.",
    to: "/dashboard/tournaments" as const,
    icon: GitBranch,
  },
  {
    title: "Officials",
    description: "Umpires, scorers, and match officials.",
    to: "/create-tournament" as const,
    icon: Users,
  },
  {
    title: "Grounds",
    description: "Venues, pitches, and ground details.",
    to: "/create-tournament" as const,
    icon: Landmark,
  },
] as const;

function MatchesIcon() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <img src={bat} alt="" className="h-9 w-auto -rotate-[28deg] drop-shadow-sm" />
      <img
        src={cricketBall}
        alt=""
        className="absolute -bottom-0.5 -right-1 h-5 w-5 rounded-full object-cover drop-shadow-sm"
      />
    </div>
  );
}

function ManageCricketCard({
  title,
  description,
  to,
  icon,
}: {
  title: string;
  description: string;
  to: string;
  icon: typeof GitBranch | "matches";
}) {
  return (
    <Link
      to={to}
      className={cn(
        "glass-card hover-lift group flex min-h-[11.5rem] flex-col items-center justify-center rounded-2xl px-5 py-8 text-center sm:min-h-[12.5rem]",
        "transition-all hover:border-primary/35",
      )}
    >
      <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[var(--shadow-glow)] group-hover:animate-pulse-glow">
        {icon === "matches" ? (
          <MatchesIcon />
        ) : (
          (() => {
            const Icon = icon;
            return <Icon className="h-8 w-8" strokeWidth={1.75} />;
          })()
        )}
      </div>
      <h3 className="mt-5 font-display text-sm font-bold text-text-primary sm:text-base">{title}</h3>
      <p className="mt-1.5 hidden text-xs leading-relaxed text-text-secondary sm:block">{description}</p>
    </Link>
  );
}

function ManageCricketPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
        <section className="flex items-center gap-3">
          <img src={fireball} alt="" className="h-7 w-auto" />
          <div>
            <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
              Manage Cricket
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Pick a module to manage your cricket operations.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MANAGE_ITEMS.map((item) => (
            <ManageCricketCard
              key={item.title}
              title={item.title}
              description={item.description}
              to={item.to}
              icon={item.icon}
            />
          ))}
        </section>
      </div>
  );
}
