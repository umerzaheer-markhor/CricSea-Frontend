import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MessageSquare } from "lucide-react";
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

export const Route = createFileRoute("/dashboard/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — CricSea" },
      { name: "description", content: "Get in touch with the CricSea team for support, partnerships, and inquiries." },
    ],
  }),
  component: ContactUsPage,
});

const INQUIRY_TYPES = [
  "General Inquiry",
  "Technical Support",
  "Tournament Setup",
  "Partnership",
  "Billing",
  "Feedback",
] as const;

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email us",
    detail: "support@cricsea.com",
    note: "We reply within one business day.",
  },
  {
    icon: Clock,
    title: "Support hours",
    detail: "Mon – Fri, 9am – 6pm",
    note: "Pakistan Standard Time (PKT).",
  },
  {
    icon: MessageSquare,
    title: "Need quick help?",
    detail: "Use the form",
    note: "Share as much detail as you can for faster assistance.",
  },
] as const;

function ContactUsPage() {
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
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="flex items-center gap-3">
        <img src={fireball} alt="" className="h-7 w-auto" />
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">Contact Us</h2>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">
            Have a question about tournaments, clubs, or your account? Send us a message and our team
            will get back to you.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8">
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
                    {INQUIRY_TYPES.map((inquiryType) => (
                      <SelectItem key={inquiryType} value={inquiryType}>
                        {inquiryType}
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
                Send Message
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-4">
          {CONTACT_INFO.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-card rounded-2xl p-5 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-text-primary">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{item.detail}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.note}</p>
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
