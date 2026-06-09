import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthShell } from "@/components/AuthShell";
import { FormField, SubmitButton } from "@/components/auth/FormField";
import coach from "@/assets/coach.png";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — CricSea" },
      { name: "description", content: "Reset your CricSea account password." },
    ],
  }),
  component: ForgotPasswordPage,
});

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your verify email address.")
    .email("Please enter your verify email address.")
    .max(255),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128)
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Confirm password not match.",
    path: ["confirmPassword"],
  });

type EmailValues = z.infer<typeof emailSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [showSuccess, setShowSuccess] = useState(false);

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  });
  const pwForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const onEmail = async (_v: EmailValues) => {
    await new Promise((r) => setTimeout(r, 500));
    setStep("reset");
  };

  const onReset = async (_v: PasswordValues) => {
    await new Promise((r) => setTimeout(r, 500));
    setShowSuccess(true);
  };

  return (
    <>
      <AuthShell imageUrl={coach} imageAlt="Cricket player">
        {step === "email" ? (
          <>
            <h1 className="text-3xl sm:text-[32px] font-bold tracking-tight text-text-primary">
              Forgot Password?
            </h1>
            <p className="mt-2 text-sm text-text-secondary max-w-sm">
              Don't worry! It happens. Please enter the email we will send the OTP in this email.
            </p>
            <form
              onSubmit={emailForm.handleSubmit(onEmail)}
              className="mt-8 space-y-6 max-w-sm"
            >
              <FormField
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                error={emailForm.formState.errors.email?.message}
                {...emailForm.register("email")}
              />
              <div className="pt-6">
                <SubmitButton loading={emailForm.formState.isSubmitting}>Next</SubmitButton>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-[32px] font-bold tracking-tight text-text-primary">
              Forgot Password
            </h1>
            <form
              onSubmit={pwForm.handleSubmit(onReset)}
              className="mt-8 space-y-5 max-w-sm"
            >
              <FormField
                label="Password"
                showPasswordToggle
                placeholder="Enter your password"
                autoComplete="new-password"
                error={pwForm.formState.errors.password?.message}
                {...pwForm.register("password")}
              />
              <FormField
                label="Confirm Password"
                showPasswordToggle
                placeholder="Enter your confirm password"
                autoComplete="new-password"
                error={pwForm.formState.errors.confirmPassword?.message}
                {...pwForm.register("confirmPassword")}
              />
              <div className="pt-6">
                <SubmitButton loading={pwForm.formState.isSubmitting}>Confirm</SubmitButton>
              </div>
            </form>
          </>
        )}
      </AuthShell>

      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fade-in-slow"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-success-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-surface p-8 sm:p-10 shadow-2xl text-center animate-fade-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-[var(--shadow-glow)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-white"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              id="reset-success-title"
              className="mt-5 text-xl font-bold tracking-tight text-text-primary"
            >
              Password Reset Successfully
            </h2>
            <p className="mt-2 text-sm text-text-secondary">Sign in with your new password</p>
            <button
              type="button"
              onClick={() => navigate({ to: "/signin" })}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[var(--shadow-glow)] transition-all hover:bg-primary-hover hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
