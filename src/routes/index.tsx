import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Footer } from "@/components/Footer";
import hero from "@/assets/hero.png";
import appStore from "@/assets/appstore.png";
import googlePlay from "@/assets/googleplay.png";
import fireball from "@/assets/fireball.png";
import coach from "@/assets/coach.png";
import graduate from "@/assets/graduate.png";
import bat from "@/assets/bat.png";
import group from "@/assets/group.png";
import tournament1 from "@/assets/tournament1.jpg";
import tournament2 from "@/assets/tournament2.jpg";
import texture from "@/assets/texture.png";
import phones from "@/assets/phones.png";
import batter from "@/assets/batter.png";
import phones2 from "@/assets/phones2.png";
import batsman from "@/assets/batsman.png";
import phoneTilted from "@/assets/phone-tilted.png";

const PLAYER_BULLETS = [
  "Create your own backyard cricket matches with custom rules",
  "Access the CricSea Scorekeeper for seamless match tracking",
  "Organize and manage private matches بسهولة",
  "View detailed team and player statistics",
  "Follow real-time match scores",
  "Track your complete batting and bowling performance",
  "Join teams, clubs, and tournaments effortlessly",
  "Discover and invite friends to live cricket matches",
];

const CLUB_BULLETS = [
  "Create and manage leagues, divisions, tournaments, and fixtures",
  "Host and manage public matches effortlessly",
  "Comprehensive player and team management",
  "Seamless member registration system",
  "Secure online payments for players, teams, and league registrations",
  "Customizable match rules (e.g., overs per match, balls per over)",
  "Ground and venue management tools",
  "Get a fully customized club website powered by CricSea",
];

const SERVICES = [
  "Club Setup",
  "Match Management",
  "Officials Rental",
  "Live Scoreboard",
  "Corporate & Club websites",
  "Match Videography",
  "Corporate Tournament Management",
  "Website Widgets",
];

const FEATURES = [
  { n: "01", title: "Match Manager", desc: "Run live matches, review games, set rules, and handle team rosters." },
  { n: "02", title: "Live Cricket Scores", desc: "Experience real-time scores and ball-by-ball live commentary just like international cricket." },
  { n: "03", title: "ScoreKeeper", desc: "Track ball-by-ball scoring from a single screen, seamlessly connected to a live scoresheet." },
  { n: "04", title: "Club Manager", desc: "Manage players, teams, officials, and run leagues and tournaments." },
  { n: "05", title: "League Manager", desc: "Run leagues your way dedicated pages, schedules, leaderboards, and points tables included." },
  { n: "06", title: "Player Dashboard", desc: "Easily create, join, and manage live matches, review past games, set match rules, and organize team rosters." },
];

const TOURNAMENTS = [
  { img: tournament1, name: "Spring Showdown", type: "Leather", date: "05th Mar 2026  -  31st Mar 2026" },
  { img: tournament2, name: "Champions Trophy", type: "Leather", date: "12th Apr 2026  -  28th Apr 2026" },
  { img: tournament1, name: "City Premier League", type: "Tape", date: "01st May 2026  -  20th May 2026" },
  { img: tournament2, name: "Sunset Cup", type: "Leather", date: "10th Jun 2026  -  30th Jun 2026" },
  { img: tournament1, name: "Monsoon Masters", type: "Tape", date: "05th Jul 2026  -  25th Jul 2026" },
  { img: tournament2, name: "National Knockouts", type: "Leather", date: "12th Aug 2026  -  02nd Sep 2026" },
];

const CATEGORIES = [
  { icon: group, title: "Players, Fans & Umpires", desc: "Join clubs and matches, monitor your performance, create private games, track scores, and connect with fellow players." },
  { icon: bat, title: "Cricket Clubs", desc: "Manage your club, organize leagues and tournaments, assign officials, handle teams and players, and host public matches." },
  { icon: graduate, title: "Schools & Universities", desc: "Engage students, satisfy parents, and elevate your school or university cricket program." },
  { icon: coach, title: "Coaches & Talent Hunters", desc: "Discover top talent from every public match on Crickslab and connect with players directly within the app." },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <img src={fireball} alt="" className="h-7 w-auto" />
      <h3 className="text-xl font-bold text-text-primary">{children}</h3>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CricSea — Elevate Your Cricket Game" },
      {
        name: "description",
        content:
          "CricSea redefines cricket for you — track every ball, count every run, and manage leagues and matches with world-class precision.",
      },
    ],
  }),
  component: Index,
});

type Match = {
  tournament: string;
  format: string;
  ball: string;
  status: "Live" | "Upcoming";
  teamA: { name: string; score: string; overs: string };
  teamB: { name: string; score: string; overs: string };
  time: string;
  note?: string;
};

const MATCHES: Match[] = [
  {
    tournament: "Test Tournament",
    format: "T20",
    ball: "Cork ball",
    status: "Live",
    teamA: { name: "Team (A)", score: "0/0", overs: "(0.0 Over)" },
    teamB: { name: "Team (B)", score: "0/0", overs: "(0.0 Over)" },
    time: "10:00 PM",
    note: "Team A won the toss and Selected to bat first",
  },
  {
    tournament: "Test Tournament",
    format: "T20",
    ball: "Cork ball",
    status: "Live",
    teamA: { name: "Team (A)", score: "0/0", overs: "(0.0 Over)" },
    teamB: { name: "Team (B)", score: "0/0", overs: "(0.0 Over)" },
    time: "10:00 PM",
    note: "Team A won the toss and Selected to bat first",
  },
  {
    tournament: "Test Tournament",
    format: "T20",
    ball: "Cork ball",
    status: "Live",
    teamA: { name: "Team (A)", score: "0/0", overs: "(0.0 Over)" },
    teamB: { name: "Team (B)", score: "0/0", overs: "(0.0 Over)" },
    time: "10:00 PM",
    note: "Team A won the toss and Selected to bat first",
  },
];

function TeamLogoA() {
  return (
    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md bg-[#fff8d6] text-[9px] sm:text-[10px] font-bold text-[#b8860b] shrink-0">
      CRICKET
    </div>
  );
}
function TeamLogoB() {
  return (
    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md bg-[#fde7d4] text-[9px] sm:text-[10px] font-bold text-[#c2410c] shrink-0">
      TIGER
    </div>
  );
}

function MatchCard({ m }: { m: Match }) {
  return (
    <Link
      to="/match"
      className="block min-w-[88vw] flex-1 rounded-xl border border-border bg-surface-secondary p-4 transition-colors hover:border-primary/30 hover-lift sm:min-w-[420px] sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
        <span className="font-semibold text-text-primary">{m.tournament}</span>
        <div className="flex items-center gap-3 sm:gap-4 text-text-secondary">
          <span>{m.format}</span>
          <span>{m.ball}</span>
          <span className="font-semibold text-danger">{m.status}</span>
          <button
            type="button"
            aria-label="More"
            className="text-text-muted"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            ⋮
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3 rounded-lg bg-surface border border-border p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <TeamLogoA />
          <div className="min-w-0">
            <div className="truncate text-xs sm:text-sm font-semibold text-text-primary">{m.teamA.name}</div>
            <div className="text-xs text-text-secondary">{m.teamA.score}</div>
            <div className="text-xs text-primary">{m.teamA.overs}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm sm:text-base font-bold text-danger">VS</div>
          <div className="mt-1 text-xs text-text-secondary">{m.time}</div>
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
          <div className="text-right min-w-0">
            <div className="truncate text-xs sm:text-sm font-semibold text-text-primary">{m.teamB.name}</div>
            <div className="text-xs text-text-secondary">{m.teamB.score}</div>
            <div className="text-xs text-primary">{m.teamB.overs}</div>
          </div>
          <TeamLogoB />
        </div>
      </div>
      {m.note && (
        <p className="mt-3 text-center text-xs text-text-secondary">{m.note}</p>
      )}
    </Link>
  );
}


function Index() {
  const HERO_SLIDES = [
    {
      eyebrow: "Elevate Your",
      title: "Cricket Game with",
      highlight: "CricSea",
      body: "CricSea redefines cricket for you — track every ball, count every run, and manage leagues and matches with world-class precision.",
    },
    {
      eyebrow: "Live Scoring",
      title: "Every Ball, Every",
      highlight: "Moment",
      body: "Real-time ball-by-ball updates, instant scorecards, and live commentary so fans never miss a beat of the action.",
    },
    {
      eyebrow: "Run Your League",
      title: "Tournaments Made",
      highlight: "Effortless",
      body: "Create fixtures, manage teams, and publish results in minutes — built for clubs, schools, and full-scale leagues.",
    },
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [HERO_SLIDES.length]);
  const [matchFilter, setMatchFilter] = useState<"live" | "result">("live");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-text-primary">
      {/* Hero section with dark bg */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0b1120" }}>
        <img
          src={hero}
          alt="Cricket player batting"
          className="absolute inset-y-0 right-0 h-full w-full sm:w-[80%] md:w-[70%] lg:w-[65%] xl:w-[60%] object-cover object-center opacity-60 sm:opacity-85 md:opacity-95"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 25%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)" }}
        />
        {/* giant watermark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
          <span className="select-none font-extrabold leading-none text-white/5" style={{ fontSize: "clamp(80px, 18vw, 200px)" }}>
            CricSea
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          {/* Hero content */}
          <div className="relative grid grid-cols-1 items-center md:grid-cols-2" style={{ minHeight: "clamp(360px, 60vw, 540px)" }}>
            <div className="py-10 sm:py-14 md:py-16" key={slide}>
              <h2 className="font-light text-white animate-fade-up" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>{HERO_SLIDES[slide].eyebrow}</h2>
              <h1 className="mt-2 font-bold leading-tight text-white animate-fade-up" style={{ fontSize: "clamp(1.875rem, 5vw, 3rem)" }}>
                {HERO_SLIDES[slide].title}{" "}
                <span className="text-primary">{HERO_SLIDES[slide].highlight}</span>
              </h1>
              <p className="mt-4 sm:mt-5 max-w-md text-sm leading-relaxed text-text-muted animate-fade-up">
                {HERO_SLIDES[slide].body}
              </p>
            </div>
          </div>

          {/* Bottom row: slider dots + app badges */}
          <div className="relative flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 sm:pb-8">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === slide ? "w-8 bg-primary" : "w-4 bg-surface/30 hover:bg-surface/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Download on the App Store">
                <img src={appStore} alt="Download on the App Store" className="h-10 sm:h-12" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src={googlePlay} alt="Get it on Google Play" className="h-10 sm:h-12" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Matches */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading>Featured Matches</SectionHeading>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border bg-surface-secondary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
              {matchFilter === "live" ? "Live matches" : "Result matches"}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[10rem]">
              <DropdownMenuRadioGroup
                value={matchFilter}
                onValueChange={(v) => setMatchFilter(v as "live" | "result")}
              >
                <DropdownMenuRadioItem value="live">Live matches</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="result">Result matches</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-5 overflow-x-auto overflow-y-visible pt-3 pb-6 no-scrollbar">
          {MATCHES.map((m, i) => (
            <MatchCard key={i} m={m} />
          ))}
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6">
          <SectionHeading>Featured Tournaments</SectionHeading>
        </div>
        <div className="flex gap-6 overflow-x-auto overflow-y-visible pt-3 pb-6 no-scrollbar">
          {TOURNAMENTS.map((t, i) => (
            <Link
              key={i}
              to="/tournament"
              className="relative block min-w-[85vw] flex-1 overflow-hidden rounded-xl transition-opacity hover:opacity-95 hover-lift sm:min-w-[480px] lg:min-w-[560px]"
            >
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="h-[200px] sm:h-[260px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
              <span className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white glow-primary">
                {t.type}
              </span>
              <span className="absolute right-4 top-4 text-sm font-medium text-white">
                {t.date}
              </span>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-[8px] font-bold text-[#c2410c]">
                  TIGER
                </div>
                <span className="text-lg font-semibold text-white">{t.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fueling Cricket */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="mb-4 flex items-center gap-3">
          <img src={fireball} alt="" className="h-7 w-auto" />
          <h3 className="text-2xl font-bold text-text-primary">
            Fueling Cricket from Grassroots{" "}
            <span className="text-primary">to Greatness</span>
          </h3>
        </div>
        <div className="space-y-2 text-sm leading-relaxed text-text-secondary">
          <p>
            Manage cricket competitions effortlessly at every level, no matter
            how big or small. From casual backyard games to competitive street
            cricket, everything is covered under one seamless system.
          </p>
          <p>
            Whether it's school tournaments or university level matches,
            organize fixtures, track performance, and streamline operations
            with ease. Designed to support growing talent at every stage of the
            game.
          </p>
          <p>
            From local clubs to professional leagues, take full control of your
            competitions with powerful management tools built for every level
            of cricket.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm hover-lift"
            >
              <img src={c.icon} alt="" className="h-10 w-10 object-contain dark:invert dark:brightness-200" />
              <h4 className="mt-5 text-base font-bold text-text-primary">
                {c.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {c.desc}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary"
              >
                Read more <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Match Center Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="mb-3 flex items-center gap-3">
          <img src={fireball} alt="" className="h-7 w-auto" />
          <h3 className="text-2xl font-bold text-text-primary">
            Match Center <span className="text-primary">Features</span>
          </h3>
        </div>
        <p className="max-w-md text-sm text-text-secondary">
          CricSea is a complete cricket solution that brings every aspect of
          the game into one powerful match center on your phone.
        </p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.n} className="rounded-xl bg-surface-secondary p-5 hover-lift">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-text-primary">{f.title}</h4>
                  <span className="text-lg font-bold text-primary">{f.n}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={batter}
              alt="CricSea app on phone"
              loading="lazy"
              className="max-h-[520px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Get the App Now */}
      <section
        className="relative overflow-hidden bg-secondary"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>Get the App Now</h3>
            <p className="mt-6 text-sm leading-relaxed text-text-muted">
              Your ultimate cricket companion is here!
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              Live matches, instant updates, breaking news &amp; more right at
              your fingertips.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#">
                <img src={appStore} alt="Download on the App Store" className="h-12" />
              </a>
              <a href="#">
                <img src={googlePlay} alt="Get it on Google Play" className="h-12" />
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={phones}
              alt="CricSea app screens"
              loading="lazy"
              className="max-h-[420px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Complete Cricket Club Management */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src={phones2}
              alt="CricSea app menus"
              loading="lazy"
              className="max-h-[480px] w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-start gap-3">
              <img src={fireball} alt="" className="mt-1 h-6 w-auto" />
              <h3 className="text-2xl font-bold text-text-primary">
                Complete Cricket Club Management{" "}
                <span className="text-primary">All in One Platform</span>
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              CricSea streamlines league and tournament management with a
              powerful, all-in-one platform. Easily choose your tournament
              format, create fixtures, and track every match with precision.
              From player and team registrations to full CRM integration,
              CricSea ensures a smooth onboarding experience—getting your
              members ready to play in no time.
            </p>
            <h4 className="mt-5 text-sm font-bold text-text-primary">Key Features:</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-secondary marker:text-text-muted">
              {CLUB_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* More Than Technology */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-start gap-3">
              <img src={fireball} alt="" className="mt-1 h-6 w-auto" />
              <h3 className="text-2xl font-bold leading-snug text-text-primary">
                More Than Technology
                <br />
                CricSea is Built for Your{" "}
                <span className="text-primary">Cricket Success</span>
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              CricSea offers a comprehensive range of services for cricket
              clubs, associations, and educational institutions. Designed to
              simplify operations, enhance matchday experiences, and streamline
              tournament management, CricSea provides everything you need in
              one powerful platform.
            </p>
            <h4 className="mt-5 text-sm font-bold text-text-primary">Our services include:</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text-secondary marker:text-text-muted">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={batsman}
              alt="Cricket batsman"
              loading="lazy"
              className="max-h-[520px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* CricSea Built for Players */}
      <section className="relative overflow-hidden bg-secondary dark:bg-background">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-[0.06]"
          style={{ backgroundImage: `url(${texture})`, backgroundSize: "cover" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dark:bg-gradient-to-br dark:from-primary/8 dark:via-transparent dark:to-transparent"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:grid-cols-2">
          <div>
            <div className="flex items-start gap-3">
              <img src={fireball} alt="" className="mt-1 h-6 w-auto" />
              <h3 className="text-2xl font-bold text-white dark:text-text-primary">
                CricSea  Built for Players,{" "}
                <span className="text-primary">Fans &amp; Officials</span>
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-muted dark:text-text-secondary">
              As players and fans of the world's greatest game, we know cricket is more than just a sport—it's the passion that drives us every day. With CricSea, you get real-time match insights, including live scores, batting performance, and bowling stats, all accessible anytime through your personal player dashboard.
            </p>
            <ul className="mt-5 list-disc space-y-1.5 pl-5 text-sm text-text-muted marker:text-text-secondary dark:text-text-secondary dark:marker:text-text-muted">
              {PLAYER_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={phoneTilted}
              alt="CricSea match screen"
              loading="lazy"
              className="max-h-[520px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* One Platform to Manage School */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-start gap-3">
              <img src={fireball} alt="" className="mt-1 h-6 w-auto" />
              <h3 className="text-2xl font-bold leading-snug text-text-primary">
                <span className="text-primary">One Platform</span> to Manage School,
                <br />
                University &amp; District Cricket
              </h3>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              Track performance at every level individual, team, and school from one unified platform for players, parents, coaches, and admins.
            </p>
            <h4 className="mt-8 text-sm font-semibold text-text-primary">Get the App Now</h4>
            <div className="mt-3 flex items-center gap-3">
              <a href="#"><img src={appStore} alt="App Store" className="h-12" /></a>
              <a href="#"><img src={googlePlay} alt="Google Play" className="h-12" /></a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={phones}
              alt="CricSea on laptop and phone"
              loading="lazy"
              className="max-h-[360px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
