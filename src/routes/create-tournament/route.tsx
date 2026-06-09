import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-tournament")({
  component: CreateTournamentLayout,
});

function CreateTournamentLayout() {
  return <Outlet />;
}
