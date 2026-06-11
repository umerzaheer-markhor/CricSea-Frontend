import type { OfficialRole } from "@/lib/official-roles";
import type { Official } from "@/lib/tournament-store";

export type SampleOfficial = Omit<Official, "tournamentId" | "createdAt">;

const PEOPLE = [
  { fullName: "Hammad", email: "hammadflutter@gmail.com", city: "Lahore" },
  { fullName: "Umer", email: "umer@cricsea.pk", city: "Lahore" },
  { fullName: "Ali", email: "ali@cricsea.pk", city: "Karachi" },
  { fullName: "Hassan", email: "hassan@cricsea.pk", city: "Islamabad" },
  { fullName: "Ahmed", email: "ahmed@cricsea.pk", city: "Faisalabad" },
  { fullName: "Bilal", email: "bilal@cricsea.pk", city: "Multan" },
] as const;

function slug(role: string) {
  return role.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function sampleForRole(role: OfficialRole, index: number): SampleOfficial {
  const person = PEOPLE[index % PEOPLE.length];
  return {
    id: `sample-${slug(role)}-${person.fullName.toLowerCase()}`,
    fullName: person.fullName,
    email: person.email,
    city: person.city,
    role,
  };
}

/** One preview official per role — shown when no real officials exist yet. */
export const SAMPLE_OFFICIALS_BY_ROLE: Record<OfficialRole, SampleOfficial[]> = {
  "League Manager": [sampleForRole("League Manager", 0)],
  "Organizer / Coordinator": [sampleForRole("Organizer / Coordinator", 1)],
  "Match Manager": [sampleForRole("Match Manager", 1)],
  "Official Manager": [sampleForRole("Official Manager", 2)],
  "Broadcast Manager": [sampleForRole("Broadcast Manager", 3)],
  "Team Owner": [sampleForRole("Team Owner", 4)],
  "Director Sports": [sampleForRole("Director Sports", 5)],
  "Trainer": [sampleForRole("Trainer", 0)],
  "Vice Principal": [sampleForRole("Vice Principal", 1)],
  "Strength & Conditioning Coach": [sampleForRole("Strength & Conditioning Coach", 2)],
  Physio: [sampleForRole("Physio", 3)],
  Analyst: [sampleForRole("Analyst", 4)],
  Principal: [sampleForRole("Principal", 5)],
  "Sports Incharge": [sampleForRole("Sports Incharge", 0)],
  "Office Bearer": [sampleForRole("Office Bearer", 1)],
  "TV Umpire": [sampleForRole("TV Umpire", 2)],
  "Vice President": [sampleForRole("Vice President", 3)],
  "Joint Secretary": [sampleForRole("Joint Secretary", 4)],
  "Cash Staff": [sampleForRole("Cash Staff", 5)],
  "Ticket Checker": [sampleForRole("Ticket Checker", 0)],
  Treasurer: [sampleForRole("Treasurer", 1)],
  Secretary: [sampleForRole("Secretary", 2)],
  President: [sampleForRole("President", 3)],
};

export function getSampleOfficialsForRole(role: OfficialRole): SampleOfficial[] {
  return SAMPLE_OFFICIALS_BY_ROLE[role] ?? [];
}

export function findSampleOfficial(
  role: OfficialRole,
  sampleId: string,
): SampleOfficial | undefined {
  return getSampleOfficialsForRole(role).find((s) => s.id === sampleId);
}
