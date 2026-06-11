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
  createdAt: string;
};

const TOURNAMENTS_KEY = "cricsea-tournaments";
const DRAWS_KEY = "cricsea-draws";
const TEAMS_KEY = "cricsea-teams";
const TEAM_SELECTIONS_KEY = "cricsea-team-selections";
const OFFICIALS_SELECTIONS_KEY = "cricsea-officials-selections";
const OFFICIALS_KEY = "cricsea-officials";
const OFFICIAL_ASSIGNMENTS_KEY = "cricsea-official-assignments";
const GROUNDS_KEY = "cricsea-grounds";
const GROUND_SELECTIONS_KEY = "cricsea-ground-selections";

export type Ground = {
  id: string;
  tournamentId: string;
  title: string;
  address: string;
  createdAt: string;
};

export type Official = {
  id: string;
  tournamentId: string;
  fullName: string;
  email: string;
  city: string;
  role: string;
  photoUrl?: string;
  createdAt: string;
};
const CUSTOM_MATCH_RULES_KEY = "cricsea-custom-match-rules";

export type Team = {
  id: string;
  tournamentId: string;
  name: string;
  shortName: string;
  displayName: string;
  slogan: string;
  teamLevel: string;
  location: string;
  bannerUrl?: string;
  logoUrl?: string;
  playerCount: number;
  createdAt: string;
};

export type CustomMatchRule = {
  id: string;
  title: string;
  description: string;
  format: "limited" | "test";
  createdAt: string;
};

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

export function getCustomMatchRules(): CustomMatchRule[] {
  return readJson<CustomMatchRule[]>(CUSTOM_MATCH_RULES_KEY, []);
}

export function createCustomMatchRule(
  input: Omit<CustomMatchRule, "id" | "createdAt">,
): CustomMatchRule {
  const rule: CustomMatchRule = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const rules = getCustomMatchRules();
  rules.push(rule);
  writeJson(CUSTOM_MATCH_RULES_KEY, rules);
  return rule;
}

export function getTeamsForTournament(tournamentId: string): Team[] {
  const teams = readJson<Team[]>(TEAMS_KEY, []);
  return teams.filter((t) => t.tournamentId === tournamentId);
}

export function getSelectedTeamIds(tournamentId: string): string[] {
  const all = readJson<Record<string, string[]>>(TEAM_SELECTIONS_KEY, {});
  return all[tournamentId] ?? [];
}

export function setSelectedTeamIds(tournamentId: string, teamIds: string[]): void {
  const all = readJson<Record<string, string[]>>(TEAM_SELECTIONS_KEY, {});
  all[tournamentId] = teamIds;
  writeJson(TEAM_SELECTIONS_KEY, all);
}

export function getSelectedOfficials(tournamentId: string): string[] {
  const all = readJson<Record<string, string[]>>(OFFICIALS_SELECTIONS_KEY, {});
  return all[tournamentId] ?? [];
}

export function setSelectedOfficials(tournamentId: string, roles: string[]): void {
  const all = readJson<Record<string, string[]>>(OFFICIALS_SELECTIONS_KEY, {});
  all[tournamentId] = roles;
  writeJson(OFFICIALS_SELECTIONS_KEY, all);
}

export function getOfficialsForTournament(tournamentId: string, role?: string): Official[] {
  const officials = readJson<Official[]>(OFFICIALS_KEY, []);
  return officials.filter(
    (o) => o.tournamentId === tournamentId && (!role || o.role === role),
  );
}

export function createOfficial(
  tournamentId: string,
  input: Omit<Official, "id" | "tournamentId" | "createdAt">,
): Official {
  const official: Official = {
    ...input,
    id: crypto.randomUUID(),
    tournamentId,
    createdAt: new Date().toISOString(),
  };
  const officials = readJson<Official[]>(OFFICIALS_KEY, []);
  officials.push(official);
  writeJson(OFFICIALS_KEY, officials);
  return official;
}

export function getOfficialAssignments(
  tournamentId: string,
): Record<string, string> {
  const all = readJson<Record<string, Record<string, string>>>(OFFICIAL_ASSIGNMENTS_KEY, {});
  return all[tournamentId] ?? {};
}

export function setOfficialAssignment(
  tournamentId: string,
  role: string,
  officialId: string,
): void {
  const all = readJson<Record<string, Record<string, string>>>(OFFICIAL_ASSIGNMENTS_KEY, {});
  if (!all[tournamentId]) all[tournamentId] = {};
  all[tournamentId][role] = officialId;
  writeJson(OFFICIAL_ASSIGNMENTS_KEY, all);
  const roles = Object.keys(all[tournamentId]);
  setSelectedOfficials(tournamentId, roles);
}

export function clearOfficialAssignment(tournamentId: string, role: string): void {
  const all = readJson<Record<string, Record<string, string>>>(OFFICIAL_ASSIGNMENTS_KEY, {});
  if (all[tournamentId]) {
    delete all[tournamentId][role];
    writeJson(OFFICIAL_ASSIGNMENTS_KEY, all);
    setSelectedOfficials(tournamentId, Object.keys(all[tournamentId] ?? {}));
  }
}

export function createTeam(
  tournamentId: string,
  input: Omit<Team, "id" | "tournamentId" | "playerCount" | "createdAt">,
): Team {
  const team: Team = {
    ...input,
    id: crypto.randomUUID(),
    tournamentId,
    playerCount: 0,
    createdAt: new Date().toISOString(),
  };
  const teams = readJson<Team[]>(TEAMS_KEY, []);
  teams.push(team);
  writeJson(TEAMS_KEY, teams);
  return team;
}

export function getGroundsForTournament(tournamentId: string): Ground[] {
  const grounds = readJson<Ground[]>(GROUNDS_KEY, []);
  return grounds.filter((g) => g.tournamentId === tournamentId);
}

export function createGround(
  tournamentId: string,
  input: Omit<Ground, "id" | "tournamentId" | "createdAt">,
): Ground {
  const ground: Ground = {
    ...input,
    id: crypto.randomUUID(),
    tournamentId,
    createdAt: new Date().toISOString(),
  };
  const grounds = readJson<Ground[]>(GROUNDS_KEY, []);
  grounds.push(ground);
  writeJson(GROUNDS_KEY, grounds);
  return ground;
}

export function getSelectedGroundIds(tournamentId: string): string[] {
  const all = readJson<Record<string, string[]>>(GROUND_SELECTIONS_KEY, {});
  return all[tournamentId] ?? [];
}

export function setSelectedGroundIds(tournamentId: string, groundIds: string[]): void {
  const all = readJson<Record<string, string[]>>(GROUND_SELECTIONS_KEY, {});
  all[tournamentId] = groundIds;
  writeJson(GROUND_SELECTIONS_KEY, all);
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
