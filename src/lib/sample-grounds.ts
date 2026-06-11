import type { Ground } from "@/lib/tournament-store";

export type SampleGround = Omit<Ground, "tournamentId" | "createdAt">;

export const SAMPLE_GROUNDS: SampleGround[] = [
  {
    id: "sample-ground-pattoki",
    title: "Ground Pattoki",
    address: "Pattoki",
  },
  {
    id: "sample-ground-lahore",
    title: "Ground Gaddafi",
    address: "Lahore",
  },
  {
    id: "sample-ground-karachi",
    title: "National Stadium",
    address: "Karachi",
  },
];

export function findSampleGround(sampleId: string): SampleGround | undefined {
  return SAMPLE_GROUNDS.find((g) => g.id === sampleId);
}
