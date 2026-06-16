export type TournamentDetailTab =
  | "overview"
  | "matches"
  | "squads"
  | "leaderboard"
  | "officials"
  | "info";

export type MatchResultTab = "live" | "upcoming" | "result";

export type LeaderboardCategory = "batting" | "bowling" | "fielding";

export const TOURNAMENT_DETAIL_TABS: { id: TournamentDetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "matches", label: "Matches" },
  { id: "squads", label: "Squads" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "officials", label: "Officials" },
  { id: "info", label: "Info" },
];

export const STANDINGS_COLS = ["M", "W", "L", "D", "P", "NR"] as const;

export type TournamentMatchCard = {
  id: string;
  resultTab: MatchResultTab;
  teamA: { code: string; score: string; overs: string };
  teamB: { code: string; score: string; overs: string };
  innings: { first: string; second: string };
  datetime: string;
};

export type SquadPlayer = {
  id: string;
  name: string;
  role: string;
};

export type SquadTeam = {
  id: string;
  name: string;
  playerCount: number;
  players: SquadPlayer[];
};

export type LeaderboardPlayer = {
  id: string;
  name: string;
  team: string;
  rank: number;
  category: LeaderboardCategory;
  stats: { label: string; value: string | number }[];
};

export type TournamentOfficial = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export const TOURNAMENT_MATCHES: TournamentMatchCard[] = [
  {
    id: "tm1",
    resultTab: "live",
    teamA: { code: "KA", score: "76/6", overs: "20.3" },
    teamB: { code: "MS", score: "—", overs: "—" },
    innings: { first: "76/6", second: "—" },
    datetime: "13 Jun 2026 • 10:03 AM",
  },
  {
    id: "tm2",
    resultTab: "live",
    teamA: { code: "MS", score: "42/2", overs: "8.0" },
    teamB: { code: "KA", score: "—", overs: "—" },
    innings: { first: "42/2", second: "—" },
    datetime: "13 Jun 2026 • 2:30 PM",
  },
  {
    id: "tm3",
    resultTab: "upcoming",
    teamA: { code: "KA", score: "—", overs: "—" },
    teamB: { code: "MS", score: "—", overs: "—" },
    innings: { first: "—", second: "—" },
    datetime: "14 Jun 2026 • 10:00 AM",
  },
  {
    id: "tm4",
    resultTab: "result",
    teamA: { code: "KA", score: "156/8", overs: "20.0" },
    teamB: { code: "MS", score: "152/9", overs: "20.0" },
    innings: { first: "156/8", second: "152/9" },
    datetime: "12 Jun 2026 • 6:00 PM",
  },
];

export const TOURNAMENT_SQUADS: SquadTeam[] = [
  {
    id: "mit",
    name: "Mit Solutions",
    playerCount: 51,
    players: [
      { id: "p1", name: "Husnain Nadeem", role: "Batsman" },
      { id: "p2", name: "Umar Waheed", role: "All Rounder" },
      { id: "p3", name: "Abuzar Tariq", role: "Bowler" },
      { id: "p4", name: "Murtaza Jamal", role: "Bowler" },
      { id: "p5", name: "Ali Raza", role: "Wicket Keeper" },
    ],
  },
  {
    id: "kingsmen",
    name: "Kingsmen Academy",
    playerCount: 40,
    players: [
      { id: "p6", name: "Muhammad Arshad", role: "Batsman" },
      { id: "p7", name: "Saad Khan", role: "All Rounder" },
      { id: "p8", name: "Bilal Ahmed", role: "Bowler" },
      { id: "p9", name: "Fahad Ali", role: "Batsman" },
    ],
  },
];

export const LEADERBOARD_PLAYERS: LeaderboardPlayer[] = [
  {
    id: "lb1",
    name: "Muhammad Arshad",
    team: "Kingsmen Academy",
    rank: 1,
    category: "batting",
    stats: [
      { label: "Matches", value: 0 },
      { label: "Innings", value: 0 },
      { label: "Runs", value: 37 },
      { label: "Highest", value: 0 },
    ],
  },
  {
    id: "lb2",
    name: "Husnain Nadeem",
    team: "Mit Solutions",
    rank: 2,
    category: "batting",
    stats: [
      { label: "Matches", value: 1 },
      { label: "Innings", value: 1 },
      { label: "Runs", value: 28 },
      { label: "Highest", value: 28 },
    ],
  },
  {
    id: "lb3",
    name: "Murtaza Jamal",
    team: "Mit Solutions",
    rank: 1,
    category: "bowling",
    stats: [
      { label: "Matches", value: 0 },
      { label: "Innings", value: 0 },
      { label: "Overs", value: 8 },
      { label: "Wickets", value: 3 },
    ],
  },
  {
    id: "lb4",
    name: "Bilal Ahmed",
    team: "Kingsmen Academy",
    rank: 2,
    category: "bowling",
    stats: [
      { label: "Matches", value: 1 },
      { label: "Innings", value: 1 },
      { label: "Overs", value: 4 },
      { label: "Wickets", value: 2 },
    ],
  },
  {
    id: "lb5",
    name: "Abuzar Tariq",
    team: "Mit Solutions",
    rank: 1,
    category: "fielding",
    stats: [
      { label: "Matches", value: 0 },
      { label: "Innings", value: 1 },
      { label: "Total WI", value: 1 },
      { label: "Caught", value: 1 },
    ],
  },
];

export const TOURNAMENT_OFFICIALS: TournamentOfficial[] = [
  {
    id: "o1",
    name: "Hammad",
    role: "League Manager",
    email: "hammad@gmail.com",
  },
  {
    id: "o2",
    name: "David Adams",
    role: "Tournament Director",
    email: "davidadams3713@gmail.com",
  },
];

export const TOURNAMENT_INFO = {
  ball: "CORK",
  createdBy: "Testing Apps",
  contactEmail: "support@cricsea.com",
};

export function matchesForResultTab(tab: MatchResultTab) {
  return TOURNAMENT_MATCHES.filter((m) => m.resultTab === tab);
}

export function leaderboardForCategory(category: LeaderboardCategory) {
  return LEADERBOARD_PLAYERS.filter((p) => p.category === category);
}
