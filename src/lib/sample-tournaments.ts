export type TournamentStatus = "ongoing" | "upcoming" | "recent";

export type TournamentListItem = {
  id: string;
  name: string;
  teams: number;
  dateRange: string;
  status: TournamentStatus;
};

export type MatchListItem = {
  id: string;
  status: TournamentStatus;
  level: string;
  format: string;
  ballType: string;
  isLive: boolean;
  teamA: { name: string; score: string; overs: string };
  teamB: { name: string; score: string; overs: string };
  time: string;
  actionLabel: string;
};

export const TOURNAMENT_LIST: TournamentListItem[] = [
  {
    id: "president-trophy-2026",
    name: "President Trophy Grade II Gold 2026-2027",
    teams: 2,
    dateRange: "2026-06-13 - 2026-06-21",
    status: "ongoing",
  },
  {
    id: "regional-cup-2026",
    name: "Regional Champions Cup 2026",
    teams: 6,
    dateRange: "2026-06-01 - 2026-06-30",
    status: "ongoing",
  },
  {
    id: "super-league-2026",
    name: "Super League T20 2026",
    teams: 10,
    dateRange: "2026-05-20 - 2026-06-25",
    status: "ongoing",
  },
  {
    id: "inter-district-2026",
    name: "Inter District Knockout 2026",
    teams: 16,
    dateRange: "2026-06-05 - 2026-06-18",
    status: "ongoing",
  },
  {
    id: "city-league-2026",
    name: "City Premier League 2026",
    teams: 8,
    dateRange: "2026-07-01 - 2026-07-28",
    status: "upcoming",
  },
  {
    id: "youth-trophy-2026",
    name: "National Youth Trophy 2026",
    teams: 14,
    dateRange: "2026-07-15 - 2026-08-10",
    status: "upcoming",
  },
  {
    id: "corporate-cup-2026",
    name: "Corporate Cricket Cup 2026",
    teams: 12,
    dateRange: "2026-08-01 - 2026-08-22",
    status: "upcoming",
  },
  {
    id: "summer-series-2026",
    name: "Summer Series Invitational 2026",
    teams: 6,
    dateRange: "2026-07-08 - 2026-07-20",
    status: "upcoming",
  },
  {
    id: "club-championship-2025",
    name: "National Club Championship 2025",
    teams: 12,
    dateRange: "2025-11-10 - 2025-12-20",
    status: "recent",
  },
  {
    id: "winter-league-2025",
    name: "Winter League Finals 2025",
    teams: 4,
    dateRange: "2025-12-01 - 2025-12-15",
    status: "recent",
  },
  {
    id: "school-cup-2025",
    name: "All Schools Cup 2025",
    teams: 20,
    dateRange: "2025-10-05 - 2025-11-28",
    status: "recent",
  },
  {
    id: "legends-match-2025",
    name: "Legends Charity Match Series 2025",
    teams: 2,
    dateRange: "2025-09-12 - 2025-09-14",
    status: "recent",
  },
];

export const TOURNAMENT_MATCHES: MatchListItem[] = [
  {
    id: "m1",
    status: "ongoing",
    level: "International level",
    format: "T20",
    ballType: "Cork ball",
    isLive: true,
    teamA: { name: "Team (A)", score: "0/0", overs: "0.0 Over" },
    teamB: { name: "Team (B)", score: "0/0", overs: "0.0 Over" },
    time: "10:00 PM",
    actionLabel: "Resume Scoring",
  },
  {
    id: "m2",
    status: "ongoing",
    level: "Domestic level",
    format: "T20",
    ballType: "Leather ball",
    isLive: true,
    teamA: { name: "Lions XI", score: "142/6", overs: "18.2 Over" },
    teamB: { name: "Tiger Club", score: "98/4", overs: "12.0 Over" },
    time: "7:30 PM",
    actionLabel: "Resume Scoring",
  },
  {
    id: "m3",
    status: "upcoming",
    level: "Club level",
    format: "T20",
    ballType: "Tennis ball",
    isLive: false,
    teamA: { name: "Eagles CC", score: "—", overs: "—" },
    teamB: { name: "Sharks CC", score: "—", overs: "—" },
    time: "Tomorrow, 4:00 PM",
    actionLabel: "View Squad",
  },
  {
    id: "m4",
    status: "upcoming",
    level: "College level",
    format: "ODI",
    ballType: "Leather ball",
    isLive: false,
    teamA: { name: "North Campus", score: "—", overs: "—" },
    teamB: { name: "South Campus", score: "—", overs: "—" },
    time: "Sat, 11:00 AM",
    actionLabel: "View Squad",
  },
  {
    id: "m5",
    status: "recent",
    level: "School level",
    format: "T20",
    ballType: "Tennis ball",
    isLive: false,
    teamA: { name: "Green Valley", score: "156/8", overs: "20.0 Over" },
    teamB: { name: "Blue Ridge", score: "149/10", overs: "19.4 Over" },
    time: "Sun, 2:00 PM",
    actionLabel: "View Stats",
  },
  {
    id: "m6",
    status: "recent",
    level: "International level",
    format: "T20",
    ballType: "Cork ball",
    isLive: false,
    teamA: { name: "Team (A)", score: "189/5", overs: "20.0 Over" },
    teamB: { name: "Team (B)", score: "191/4", overs: "19.1 Over" },
    time: "Fri, 9:00 PM",
    actionLabel: "View Stats",
  },
  {
    id: "m7",
    status: "ongoing",
    level: "Club level",
    format: "T10",
    ballType: "Tennis ball",
    isLive: true,
    teamA: { name: "Falcons CC", score: "78/3", overs: "8.4 Over" },
    teamB: { name: "Hawks CC", score: "62/2", overs: "7.0 Over" },
    time: "6:15 PM",
    actionLabel: "Resume Scoring",
  },
  {
    id: "m8",
    status: "ongoing",
    level: "College level",
    format: "ODI",
    ballType: "Leather ball",
    isLive: true,
    teamA: { name: "Metro Uni", score: "210/7", overs: "42.3 Over" },
    teamB: { name: "City Uni", score: "198/9", overs: "40.0 Over" },
    time: "3:00 PM",
    actionLabel: "Resume Scoring",
  },
  {
    id: "m9",
    status: "ongoing",
    level: "School level",
    format: "T20",
    ballType: "Tennis ball",
    isLive: false,
    teamA: { name: "St. Mary's", score: "112/4", overs: "14.0 Over" },
    teamB: { name: "Greenfield", score: "89/6", overs: "12.2 Over" },
    time: "5:45 PM",
    actionLabel: "Resume Scoring",
  },
  {
    id: "m10",
    status: "upcoming",
    level: "Domestic level",
    format: "T20",
    ballType: "Leather ball",
    isLive: false,
    teamA: { name: "Northern Stars", score: "—", overs: "—" },
    teamB: { name: "Southern Kings", score: "—", overs: "—" },
    time: "Mon, 8:00 PM",
    actionLabel: "View Squad",
  },
  {
    id: "m11",
    status: "upcoming",
    level: "International level",
    format: "T20",
    ballType: "Cork ball",
    isLive: false,
    teamA: { name: "Pakistan A", score: "—", overs: "—" },
    teamB: { name: "India A", score: "—", overs: "—" },
    time: "Wed, 7:00 PM",
    actionLabel: "View Squad",
  },
  {
    id: "m12",
    status: "upcoming",
    level: "Club level",
    format: "T10",
    ballType: "Tennis ball",
    isLive: false,
    teamA: { name: "Warriors XI", score: "—", overs: "—" },
    teamB: { name: "Knights XI", score: "—", overs: "—" },
    time: "Thu, 5:30 PM",
    actionLabel: "View Squad",
  },
  {
    id: "m13",
    status: "recent",
    level: "Domestic level",
    format: "ODI",
    ballType: "Leather ball",
    isLive: false,
    teamA: { name: "Capital XI", score: "267/8", overs: "50.0 Over" },
    teamB: { name: "Coastal XI", score: "264/10", overs: "49.5 Over" },
    time: "Tue, 1:00 PM",
    actionLabel: "View Stats",
  },
  {
    id: "m14",
    status: "recent",
    level: "College level",
    format: "T20",
    ballType: "Tennis ball",
    isLive: false,
    teamA: { name: "East Campus", score: "134/6", overs: "20.0 Over" },
    teamB: { name: "West Campus", score: "130/8", overs: "20.0 Over" },
    time: "Sat, 4:30 PM",
    actionLabel: "View Stats",
  },
  {
    id: "m15",
    status: "recent",
    level: "Club level",
    format: "T10",
    ballType: "Tennis ball",
    isLive: false,
    teamA: { name: "Royal CC", score: "95/5", overs: "10.0 Over" },
    teamB: { name: "Crown CC", score: "91/7", overs: "10.0 Over" },
    time: "Sun, 6:00 PM",
    actionLabel: "View Stats",
  },
];

export const STATUS_LABELS: Record<TournamentStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  recent: "Recent",
};

export const STATUS_META: Record<
  TournamentStatus,
  { description: string; accent: string; dot: string }
> = {
  ongoing: {
    description: "Live and in-progress events",
    accent: "from-primary/20 via-primary/5 to-transparent",
    dot: "bg-primary animate-pulse-glow",
  },
  upcoming: {
    description: "Scheduled to start soon",
    accent: "from-sky-500/15 via-sky-500/5 to-transparent",
    dot: "bg-sky-400",
  },
  recent: {
    description: "Recently completed results",
    accent: "from-violet-500/15 via-violet-500/5 to-transparent",
    dot: "bg-violet-400",
  },
};

export function matchesByStatus(status: TournamentStatus) {
  return TOURNAMENT_MATCHES.filter((match) => match.status === status);
}

export function tournamentsByStatus(status: TournamentStatus) {
  return TOURNAMENT_LIST.filter((tournament) => tournament.status === status);
}
