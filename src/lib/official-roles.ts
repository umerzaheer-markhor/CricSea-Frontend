export const OFFICIAL_ROLES = [
  "League Manager",
  "Organizer / Coordinator",
  "Match Manager",
  "Official Manager",
  "Broadcast Manager",
  "Team Owner",
  "Director Sports",
  "Trainer",
  "Vice Principal",
  "Strength & Conditioning Coach",
  "Physio",
  "Analyst",
  "Principal",
  "Sports Incharge",
  "Office Bearer",
  "TV Umpire",
  "Vice President",
  "Joint Secretary",
  "Cash Staff",
  "Ticket Checker",
  "Treasurer",
  "Secretary",
  "President",
] as const;

export type OfficialRole = (typeof OFFICIAL_ROLES)[number];

/** Roles that show an assigned-count badge when selected (per mobile design). */
export const OFFICIAL_ROLES_WITH_COUNT: OfficialRole[] = [
  "League Manager",
  "Organizer / Coordinator",
];
