export type Tournament = {
  id: string;
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  category: string;
  ballType: string;
  createdAt: string;
};

export type Draw = {
  id: string;
  tournamentId: string;
  name: string;
  matchRules: string;
  matchLevel: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

const TOURNAMENTS_KEY = "cricsea-tournaments";
const DRAWS_KEY = "cricsea-draws";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getTournament(id: string): Tournament | null {
  const tournaments = readJson<Tournament[]>(TOURNAMENTS_KEY, []);
  return tournaments.find((t) => t.id === id) ?? null;
}

export function createTournament(
  input: Omit<Tournament, "id" | "createdAt">,
): Tournament {
  const tournament: Tournament = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const tournaments = readJson<Tournament[]>(TOURNAMENTS_KEY, []);
  tournaments.push(tournament);
  writeJson(TOURNAMENTS_KEY, tournaments);
  return tournament;
}

export function getDrawsForTournament(tournamentId: string): Draw[] {
  const draws = readJson<Draw[]>(DRAWS_KEY, []);
  return draws.filter((d) => d.tournamentId === tournamentId);
}

export function createDraw(
  tournamentId: string,
  input: Omit<Draw, "id" | "tournamentId" | "createdAt">,
): Draw {
  const draw: Draw = {
    ...input,
    id: crypto.randomUUID(),
    tournamentId,
    createdAt: new Date().toISOString(),
  };
  const draws = readJson<Draw[]>(DRAWS_KEY, []);
  draws.push(draw);
  writeJson(DRAWS_KEY, draws);
  return draw;
}
