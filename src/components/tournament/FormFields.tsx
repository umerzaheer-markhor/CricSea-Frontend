import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
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
            "flex h-11 w-full items-center justify-between rounded-xl border border-border bg-surface-secondary px-3 text-sm transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
            !date && "text-text-muted",
          )}
        >
          <span className={date ? "text-text-primary font-medium" : "text-text-muted"}>
            {date ? format(date, "d MMMM, yyyy") : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 text-text-secondary shrink-0" />
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
