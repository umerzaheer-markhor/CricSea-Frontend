import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { SubmitButton } from "@/components/auth/FormField";
import { cn } from "@/lib/utils";
import batsman from "@/assets/batsman.png";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [
      { title: "Verify Email — CricSea" },
      { name: "description", content: "Verify your email with the OTP we sent." },
    ],
  }),
  component: VerifyOtpPage,
});

const OTP_LENGTH = 4;
const VALID_OTP = "1234";
const RESEND_SECONDS = 120;

function VerifyOtpPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setDigit = (idx: number, value: string) => {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[idx] = v;
      return next;
    });
    setError(null);
    if (v && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const onKeyDown = (idx: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    inputsRef.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the full 4-digit code.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    if (code !== VALID_OTP) {
      setError("Incorrect OTP entered.");
      return;
    }
    navigate({ to: "/" });
  };

  const resend = () => {
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(null);
    setSeconds(RESEND_SECONDS);
    inputsRef.current[0]?.focus();
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <AuthShell imageUrl={batsman} imageAlt="Cricket players walking on field">
      <div>
        <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-text-primary">
          Verify Your Email
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Please enter the 4-digit OTP sent to your email.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 max-w-md">
        <div className="flex gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={onKeyDown(i)}
              onPaste={onPaste}
              aria-label={`Digit ${i + 1}`}
              className={cn(
                "h-14 w-14 sm:h-16 sm:w-16 rounded-lg border bg-surface text-center text-2xl font-semibold text-text-primary",
                "shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all duration-200",
                "focus:ring-2 focus:ring-primary/30 focus:border-primary",
                error
                  ? "border-danger/60 focus:border-danger focus:ring-danger/30"
                  : "border-border hover:border-border",
              )}
            />
          ))}
        </div>

        <div className="mt-3 min-h-[20px] text-xs">
          {error ? (
            <p className="flex items-center gap-1.5 font-medium text-danger animate-fade-up">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{error}</span>
            </p>
          ) : seconds > 0 ? (
            <p className="text-text-secondary">
              Didn't receive the code?{" "}
              <span className="font-semibold text-text-primary">
                {mm}:{ss}
              </span>
            </p>
          ) : (
            <p className="text-text-secondary">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={resend}
                className="font-semibold text-text-primary hover:text-primary-hover transition-colors"
              >
                Resend OTP
              </button>
            </p>
          )}
        </div>

        <div className="mt-16 sm:mt-20">
          <SubmitButton loading={submitting}>Verify OTP</SubmitButton>
        </div>
      </form>
    </AuthShell>
  );
}
