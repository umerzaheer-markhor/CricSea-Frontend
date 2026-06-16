import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FormField, tournamentFieldClassName } from "@/components/tournament/FormFields";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import fireball from "@/assets/fireball.png";

export const Route = createFileRoute("/dashboard/create-club")({
  head: () => ({
    meta: [
      { title: "Create Club — CricSea" },
      { name: "description", content: "Register your cricket club on CricSea." },
    ],
  }),
  component: CreateClubPage,
});

const CLUB_TYPES = [
  "School Club",
  "College Club",
  "Community Club",
  "Cricket Academy",
  "Domestic Club",
  "International Club",
] as const;

function CreateClubPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = fullName.trim() && email.trim() && type && message.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="flex items-center gap-3">
        <img src={fireball} alt="" className="h-7 w-auto" />
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">Create Club</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Submit your club details and we&apos;ll help you get set up on CricSea.
          </p>
        </div>
      </section>

      <section className="glass-card rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 sm:grid-cols-2">
            <FormField label="Full Name">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alexa"
                className={tournamentFieldClassName}
              />
            </FormField>

            <FormField label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@gmail.com"
                className={tournamentFieldClassName}
              />
            </FormField>

            <FormField label="Type">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className={cn(tournamentFieldClassName, "cursor-pointer")}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {CLUB_TYPES.map((clubType) => (
                    <SelectItem key={clubType} value={clubType}>
                      {clubType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Message">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here.."
                rows={5}
                className={cn(
                  tournamentFieldClassName,
                  "min-h-[11rem] resize-y py-3 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/35",
                )}
              />
            </FormField>
          </div>

          <div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-xl px-10 py-3 text-sm font-bold text-primary-foreground btn-cta disabled:pointer-events-none disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
