import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, showPasswordToggle, type = "text", className, id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = id ?? `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const inputType = showPasswordToggle ? (show ? "text" : "password") : type;

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-xs font-medium text-text-primary">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full h-11 rounded-lg border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted",
              "shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 outline-none",
              "focus:ring-2 focus:ring-primary/30 focus:border-primary",
              error
                ? "border-danger/60 focus:border-danger focus:ring-danger/30"
                : "border-border hover:border-border",
              showPasswordToggle && "pr-11",
              className,
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="flex items-start gap-1.5 text-xs font-medium text-danger animate-fade-up"
          >
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-none" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function SubmitButton({ loading, children, className, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || props.disabled}
      className={cn(
        "group relative w-full h-12 rounded-xl overflow-hidden",
        "bg-gradient-to-r from-primary to-primary-hover text-primary-foreground",
        "text-sm font-semibold tracking-wide",
        "shadow-[var(--shadow-glow)] ring-1 ring-inset ring-white/15",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
        "active:translate-y-0 active:scale-[0.99]",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
      {...props}
    >
      {/* shimmer sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative inline-flex items-center justify-center gap-2">
        {loading && (
          <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        )}
        <span>{loading ? "Please wait…" : children}</span>
      </span>
    </button>
  );
}

