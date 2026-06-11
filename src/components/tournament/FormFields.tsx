import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const tournamentFieldClassName =
  "h-11 w-full rounded-xl border border-border bg-surface-secondary text-text-primary shadow-none placeholder:text-text-muted focus-visible:outline-none focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/35";

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-2 overflow-visible">
      <Label className="text-sm font-semibold text-text-primary">{label}</Label>
      {children}
    </div>
  );
}

export function DatePickerField({
  date,
  onSelect,
  placeholder,
}: {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            tournamentFieldClassName,
            "flex w-full min-w-0 items-center justify-between gap-2 px-3 text-left transition-colors hover:border-primary/30",
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              date ? "font-medium text-text-primary" : "text-text-muted",
            )}
          >
            {date ? format(date, "d MMMM, yyyy") : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 shrink-0 text-text-secondary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onSelect(d);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
