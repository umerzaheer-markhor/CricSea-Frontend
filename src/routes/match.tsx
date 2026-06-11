import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackgroundGlow } from "@/components/BackgroundGlow";
import { Footer } from "@/components/Footer";
import fireball from "@/assets/fireball.png";
import batsman from "@/assets/batsman.png";
import batter from "@/assets/batter.png";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Match Scorecard — CricSea" },
      { name: "description", content: "Live cricket match scorecard, overs, batting and bowling stats." },
    ],
  }),
  component: MatchPage,
});

const OVERS = [
  { label: "1", color: "ball-run" },
  { label: "4", color: "ball-run" },
  { label: "6", color: "ball-run" },
  { label: "W", color: "ball-wicket" },
  { label: "", color: "ball-dot" },
  { label: "", color: "ball-dot" },
];
const TABS = ["Scoreboard", "Ball by ball", "Squad", "Match info"];
const PITCH = ["10th", "9th", "8th", "7th", "5th (C)", "5th (WK)", "3rd", "2nd", "1st"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <img src={fireball} alt="" className="h-7 w-auto" />
      <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">{children}</h2>
    </div>
  );
}

function MatchPage() {
  const [tab, setTab] = useState("Scoreboard");
  const [team, setTeam] = useState<"A" | "B">("A");

  return (
    <div className="relative w-full overflow-x-clip bg-background mesh-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BackgroundGlow />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Match Scorecard */}
        <section className="space-y-6 animate-fade-up">
          <SectionTitle>Match Scorecard</SectionTitle>
          <div className="relative overflow-hidden rounded-3xl live-card p-6 sm:p-8">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 mesh-bg" />
            <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-3">
              <div className="relative group">
                <img src={batter} alt="Team A" className="mx-auto h-44 sm:h-56 w-auto object-contain drop-shadow-[0_20px_40px_rgba(34,197,94,0.25)] transition-transform duration-500 group-hover:-translate-y-2" />
                <div className="mx-auto mt-2 w-fit min-w-[200px] rounded-2xl glass-card p-4 text-center">
                  <p className="font-bold text-text-primary">Team (A)</p>
                  <p className="text-lg font-extrabold text-text-primary">23/2</p>
                  <p className="text-xs font-semibold text-primary">(1.2 Overs)</p>
                </div>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-danger/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-danger ring-1 ring-danger/30">
                  <span className="h-2 w-2 rounded-full bg-danger animate-pulse-glow" /> Live
                </span>
                <p className="font-display my-3 text-7xl sm:text-8xl font-bold tracking-tighter text-gradient-primary leading-none">VS</p>
                <p className="text-sm text-text-secondary">Team A needs <span className="font-bold text-text-primary">0 runs</span> in <span className="font-bold text-text-primary">52 balls</span></p>
              </div>
              <div className="relative group">
                <img src={batsman} alt="Team B" className="mx-auto h-44 sm:h-56 w-auto object-contain drop-shadow-[0_20px_40px_rgba(34,197,94,0.25)] transition-transform duration-500 group-hover:-translate-y-2" />
                <div className="mx-auto mt-2 w-fit min-w-[200px] rounded-2xl glass-card p-4 text-center">
                  <p className="font-bold text-text-primary">Team (B)</p>
                  <p className="text-lg font-extrabold text-text-primary">23/2</p>
                  <p className="text-xs font-semibold text-primary">(1.2 Overs)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overs */}
        <section className="space-y-6 animate-fade-up">
          <SectionTitle>Overs</SectionTitle>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 rounded-2xl glass-card p-6">
            {OVERS.map((o, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold transition-transform hover:-translate-y-1 hover:scale-110 animate-scale-in ${o.color}`}
              >
                {o.label || "•"}
              </div>
            ))}
          </div>
        </section>

        {/* Match Center */}
        <section className="space-y-6 animate-fade-up">
          <SectionTitle>Match Center</SectionTitle>
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full glass-card p-1.5 w-fit mx-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Team selector — always rendered to keep layout stable across tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setTeam("A")}
              className={`flex items-center gap-3 rounded-2xl p-3 text-left transition-all hover-lift ${team === "A" ? "bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-[var(--shadow-glow)]" : "glass-card text-text-primary"}`}
            >
              <img src={batter} alt="" className="h-14 w-auto" />
              <span className="text-base font-semibold">Team A</span>
            </button>
            <button
              onClick={() => setTeam("B")}
              className={`flex items-center gap-3 rounded-2xl p-3 text-right justify-end transition-all hover-lift ${team === "B" ? "bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-[var(--shadow-glow)]" : "glass-card text-text-primary"}`}
            >
              <span className="text-base font-semibold">Team B</span>
              <img src={batsman} alt="" className="h-14 w-auto" />
            </button>
          </div>
        </section>

        <div className="space-y-12">
          <div className={tab === "Scoreboard" ? "space-y-12" : "hidden"}>
            <Scoreboard team={team} />
          </div>
          <div className={tab === "Ball by ball" ? "space-y-12" : "hidden"}>
            <BallByBall team={team} />
          </div>
          <div className={tab === "Squad" ? undefined : "hidden"}>
            <Squad />
          </div>
          <div className={tab === "Match info" ? undefined : "hidden"}>
            <MatchInfo />
          </div>
        </div>



      </main>

      <Footer />
    </div>
  );
}

type Team = "A" | "B";

type Batter = { name: string; r: number; b: number; fours: number; sixes: number; db: number; sr: string; t: string };
type Bowler = { name: string; o: string; m: number; r: number; w: number; wd: number; nb: number; econ: string };

const BATTING: Record<Team, { rows: Batter[]; extras: string; total: string }> = {
  A: {
    rows: [
      { name: "1st", r: 9, b: 4, fours: 2, sixes: 4, db: 0, sr: "600.0", t: "0m" },
      { name: "2nd", r: 6, b: 2, fours: 4, sixes: 0, db: 2, sr: "400.0", t: "0m" },
    ],
    extras: "0(0)",
    total: "24/0 (0.4)",
  },
  B: {
    rows: [
      { name: "3rd", r: 18, b: 9, fours: 3, sixes: 1, db: 1, sr: "200.0", t: "12m" },
      { name: "4th", r: 24, b: 11, fours: 4, sixes: 2, db: 0, sr: "218.0", t: "15m" },
      { name: "5th", r: 7, b: 5, fours: 1, sixes: 0, db: 2, sr: "140.0", t: "6m" },
    ],
    extras: "2(1)",
    total: "51/1 (2.5)",
  },
};

const BOWLING: Record<Team, Bowler[]> = {
  A: [{ name: "1st", o: "0.4", m: 4, r: 24, w: 0, wd: 0, nb: 0, econ: "36.00" }],
  B: [
    { name: "6th", o: "2.0", m: 1, r: 18, w: 1, wd: 1, nb: 0, econ: "9.00" },
    { name: "7th", o: "0.5", m: 0, r: 6, w: 0, wd: 0, nb: 1, econ: "7.20" },
  ],
};

const KEYS: Record<Team, { team: string; captain: string; wk: string }> = {
  A: { team: "TT", captain: "5th", wk: "4th" },
  B: { team: "DM", captain: "8th", wk: "7th" },
};

function Scoreboard({ team }: { team: Team }) {
  const bat = BATTING[team];
  const bowl = BOWLING[team];
  const keys = KEYS[team];
  return (
    <>
      <section className="space-y-4">
        <SectionTitle>Batting</SectionTitle>
        <div className="overflow-hidden rounded-2xl glass-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-primary">
                  <th className="px-5 py-4 font-bold">Batter</th>
                  <th className="px-3 py-4 font-bold text-center">R</th>
                  <th className="px-3 py-4 font-bold text-center">B</th>
                  <th className="px-3 py-4 font-bold text-center">4s</th>
                  <th className="px-3 py-4 font-bold text-center">6s</th>
                  <th className="px-3 py-4 font-bold text-center">DB</th>
                  <th className="px-3 py-4 font-bold text-center">SR</th>
                  <th className="px-5 py-4 font-bold text-center">T</th>
                </tr>
              </thead>
              <tbody className="text-text-primary">
                {bat.rows.map((r) => (
                  <tr key={r.name} className="row-hover border-t border-border/60">
                    <td className="px-5 py-3 font-medium">{r.name} <span className="text-primary text-xs font-semibold">(Not out)</span></td>
                    <td className="px-3 py-3 text-center font-display font-semibold">{r.r}</td>
                    <td className="px-3 py-3 text-center">{r.b}</td>
                    <td className="px-3 py-3 text-center">{r.fours}</td>
                    <td className="px-3 py-3 text-center">{r.sixes}</td>
                    <td className="px-3 py-3 text-center">{r.db}</td>
                    <td className="px-3 py-3 text-center">{r.sr}</td>
                    <td className="px-5 py-3 text-center text-text-secondary">{r.t}</td>
                  </tr>
                ))}
                <tr>
                  <td className="px-5 py-3" colSpan={8}>Extras <span className="text-primary">{bat.extras}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary-hover px-5 py-3 text-primary-foreground shadow-[var(--shadow-glow)]">
            <span className="font-bold tracking-wide">Total</span>
            <span className="font-display text-lg font-bold tracking-tight">{bat.total}</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-semibold text-text-primary">Pitch Type</h3>
        <div className="flex flex-wrap gap-2.5">
          {PITCH.map((p) => (
            <span key={p} className="chip cursor-default">{p}</span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>Bowling</SectionTitle>
        <div className="overflow-x-auto rounded-2xl glass-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-primary">
                <th className="px-5 py-4 font-bold">Bowler</th>
                <th className="px-3 py-4 font-bold text-center">O</th>
                <th className="px-3 py-4 font-bold text-center">M</th>
                <th className="px-3 py-4 font-bold text-center">R</th>
                <th className="px-3 py-4 font-bold text-center">W</th>
                <th className="px-3 py-4 font-bold text-center">WD</th>
                <th className="px-3 py-4 font-bold text-center">NB</th>
                <th className="px-5 py-4 font-bold text-center">Econ</th>
              </tr>
            </thead>
            <tbody className="text-text-primary">
              {bowl.map((r) => (
                <tr key={r.name} className="row-hover border-t border-border/60">
                  <td className="px-5 py-3 font-medium">{r.name} <span className="text-primary text-xs font-semibold">(Not out)</span></td>
                  <td className="px-3 py-3 text-center font-display font-semibold">{r.o}</td>
                  <td className="px-3 py-3 text-center">{r.m}</td>
                  <td className="px-3 py-3 text-center">{r.r}</td>
                  <td className="px-3 py-3 text-center text-primary font-semibold">{r.w}</td>
                  <td className="px-3 py-3 text-center">{r.wd}</td>
                  <td className="px-3 py-3 text-center">{r.nb}</td>
                  <td className="px-5 py-3 text-center font-display font-semibold">{r.econ}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle>Keys</SectionTitle>
        <div className="rounded-2xl glass-card p-5">
          <p className="font-semibold text-text-primary">{keys.team}</p>
          <div className="mt-4 space-y-3 text-sm text-text-primary">
            <div className="flex items-center justify-between"><span>Captain</span><span>{keys.captain}</span></div>
            <div className="flex items-center justify-between"><span>Wicket keeper</span><span>{keys.wk}</span></div>
          </div>
        </div>
      </section>
    </>
  );
}

type Ball = { label: string; color: string; main: string; sub: string; tag: string };
type Over = { number: number; summary: string; runs: number; wkts: number; bowler: string; balls: Ball[] };

const OVERS_DATA: Record<Team, Over[]> = {
  A: [
    {
      number: 1,
      summary: "After Over 1 — TT 32/0 (1.0 Over)",
      runs: 32,
      wkts: 0,
      bowler: "TT",
      balls: [
        { label: "W", color: "ball-wicket", main: "9 to 2", sub: "Six", tag: "1.1" },
        { label: "6", color: "bg-primary", main: "1 to 1", sub: "Six", tag: "0.2" },
        { label: "W", color: "ball-wicket", main: "8 to 2", sub: "Six", tag: "1.3" },
        { label: "6", color: "bg-primary", main: "1 to 1", sub: "Six", tag: "0.4" },
        { label: "6", color: "bg-primary", main: "1 to 1", sub: "Four whacks the ball to the boundary", tag: "0.5" },
        { label: "6", color: "bg-primary", main: "1 to 1", sub: "Four whacks the ball to the boundary", tag: "1.0" },
      ],
    },
    {
      number: 2,
      summary: "After Over 2 — TT 41/1 (2.0 Over)",
      runs: 9,
      wkts: 1,
      bowler: "TT",
      balls: [
        { label: "1", color: "bg-primary", main: "1 to 1", sub: "Single taken", tag: "2.1" },
        { label: "4", color: "bg-primary", main: "4 to 1", sub: "Driven through covers", tag: "2.2" },
        { label: "0", color: "ball-dot", main: "0 to 0", sub: "Dot ball", tag: "2.3" },
        { label: "W", color: "ball-wicket", main: "Wicket", sub: "Caught at mid-off", tag: "2.4" },
        { label: "2", color: "bg-primary", main: "2 to 1", sub: "Quick double", tag: "2.5" },
        { label: "2", color: "bg-primary", main: "2 to 1", sub: "Punched to deep cover", tag: "2.6" },
      ],
    },
  ],
  B: [
    {
      number: 1,
      summary: "After Over 1 — DM 12/0 (1.0 Over)",
      runs: 12,
      wkts: 0,
      bowler: "DM",
      balls: [
        { label: "4", color: "bg-primary", main: "4 to 1", sub: "Edge to third man", tag: "1.1" },
        { label: "1", color: "bg-primary", main: "1 to 1", sub: "Single", tag: "1.2" },
        { label: "0", color: "ball-dot", main: "0 to 0", sub: "Dot ball", tag: "1.3" },
        { label: "6", color: "bg-primary", main: "6 to 1", sub: "Over long-on", tag: "1.4" },
        { label: "1", color: "bg-primary", main: "1 to 1", sub: "Push to mid-off", tag: "1.5" },
        { label: "0", color: "ball-dot", main: "0 to 0", sub: "Defended", tag: "1.6" },
      ],
    },
    {
      number: 2,
      summary: "After Over 2 — DM 26/1 (2.0 Over)",
      runs: 14,
      wkts: 1,
      bowler: "DM",
      balls: [
        { label: "4", color: "bg-primary", main: "4 to 1", sub: "Cut for boundary", tag: "2.1" },
        { label: "2", color: "bg-primary", main: "2 to 1", sub: "Worked to leg", tag: "2.2" },
        { label: "W", color: "ball-wicket", main: "Wicket", sub: "Bowled middle stump", tag: "2.3" },
        { label: "1", color: "bg-primary", main: "1 to 1", sub: "Single", tag: "2.4" },
        { label: "6", color: "bg-primary", main: "6 to 1", sub: "Lofted straight", tag: "2.5" },
        { label: "1", color: "bg-primary", main: "1 to 1", sub: "Tap and run", tag: "2.6" },
      ],
    },
    {
      number: 3,
      summary: "After Over 3 — DM 51/1 (2.5 Over)",
      runs: 25,
      wkts: 0,
      bowler: "DM",
      balls: [
        { label: "6", color: "bg-primary", main: "6 to 1", sub: "Pulled for six", tag: "3.1" },
        { label: "4", color: "bg-primary", main: "4 to 1", sub: "Through gully", tag: "3.2" },
        { label: "4", color: "bg-primary", main: "4 to 1", sub: "Punched down ground", tag: "3.3" },
        { label: "1", color: "bg-primary", main: "1 to 1", sub: "Single", tag: "3.4" },
        { label: "WD", color: "ball-extra", main: "Wide", sub: "Down leg side", tag: "3.5" },
      ],
    },
  ],
};

function BallByBall({ team }: { team: Team }) {
  const overs = OVERS_DATA[team];
  return (
    <div className="space-y-8">
      {overs.map((over) => (
        <section key={over.number} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-text-primary">After Over {over.number}</h3>
            <p className="text-sm font-semibold text-text-primary">{over.summary.split("—")[1]?.trim()}</p>
          </div>
          <div className="rounded-2xl glass-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-text-primary">
              <span>Over {over.number}</span>
              <div className="flex items-center gap-6 text-text-primary">
                <span>{over.runs} runs</span>
                <span>{over.wkts} WKTS</span>
                <span className="rounded-md bg-surface-secondary px-3 py-1 text-xs">{over.bowler}</span>
              </div>
            </div>
            <ul className="mt-5 space-y-4">
              {over.balls.map((b, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${b.color}`}>{b.label}</div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{b.main}</p>
                      <p className="text-xs text-text-secondary">{b.sub}</p>
                    </div>
                  </div>
                  <span className="rounded-md border border-primary px-4 py-1 text-xs font-semibold text-primary">{b.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}


const TEAM_A_PLAYERS = [
  { label: "12th", role: "Bowler" },
  { label: "11th", role: "Bowler" },
  { label: "10th", role: "Batter" },
  { label: "9th", role: "Bowler" },
  { label: "8th", role: "Batter" },
  { label: "7th", role: "Batter" },
  { label: "5th (C)", role: "Bowler" },
  { label: "4th (WK)", role: "Bowler" },
  { label: "3rd", role: "Batter" },
  { label: "2nd", role: "Batter" },
  { label: "1st", role: "Bowler" },
];
const TEAM_B_PLAYERS = [
  { label: "1st", role: "Bowler" },
  { label: "2nd", role: "Batter" },
  { label: "3rd", role: "Batter" },
  { label: "4th", role: "Batter" },
  { label: "5th", role: "Bowler" },
  { label: "6th", role: "Bowler" },
  { label: "7th (WK)", role: "Bowler" },
  { label: "8th (C)", role: "Batter" },
  { label: "9th", role: "Batter" },
  { label: "10th", role: "Bowler" },
  { label: "11th", role: "Batter" },
];

function PlayerRow({ label, role, side }: { label: string; role: string; side: "left" | "right" }) {
  const avatar = (
    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-hover ring-2 ring-surface shadow-[0_4px_12px_-4px_color-mix(in_oklab,var(--primary)_50%,transparent)]" />
  );
  if (side === "left") {
    return (
      <div className="flex items-center gap-3">
        {avatar}
        <div>
          <p className="text-sm font-semibold text-text-primary">{label}</p>
          <p className="text-xs text-text-secondary">{role}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-end gap-3">
      <div className="text-right">
        <p className="text-sm font-semibold text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary">{role}</p>
      </div>
      {avatar}
    </div>
  );
}

function Squad() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="mb-6 text-center text-base font-bold text-text-primary">Playing XI</h3>
        <div className="relative grid grid-cols-2 gap-8">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-border" />
          <div className="space-y-4">
            <p className="font-bold text-text-primary">Team (A)</p>
            {TEAM_A_PLAYERS.map((p) => <PlayerRow key={p.label} {...p} side="left" />)}
          </div>
          <div className="space-y-4">
            <p className="text-right font-bold text-text-primary">Team (B)</p>
            {TEAM_B_PLAYERS.map((p) => <PlayerRow key={p.label} {...p} side="right" />)}
          </div>
        </div>
        <h3 className="mt-8 mb-6 text-center text-base font-bold text-text-primary">Substitutes</h3>
        <div className="grid grid-cols-2 gap-8">
          <PlayerRow label="6th" role="Batter" side="left" />
          <PlayerRow label="6th" role="Bowler" side="right" />
        </div>
      </div>
    </section>
  );
}

const INFO_ROWS: [string, string][] = [
  ["Teams", "Team (A) Team (B)"],
  ["Tournament", "Test Tournament"],
  ["Venue", "Model town lahore"],
  ["Schedule", "Thu 13 July 2026. 3:13 AM"],
  ["Format", "2 Over test 5 day . 11 per side"],
  ["Toss", "Team (B) won the toss and selected to bat first"],
  ["Result", "---"],
  ["Officials", "David Adam"],
];

function MatchInfo() {
  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl glass-card">
        <table className="w-full text-sm">
          <tbody>
            {INFO_ROWS.map(([k, v]) => (
              <tr key={k} className="row-hover align-top border-t border-border/60 first:border-t-0">
                <td className="w-1/3 px-6 py-4 font-bold text-text-primary">{k}</td>
                <td className="px-6 py-4 text-text-secondary">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

