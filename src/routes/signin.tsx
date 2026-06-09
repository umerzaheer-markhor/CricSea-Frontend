import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthShell } from "@/components/AuthShell";
import { FormField, SubmitButton } from "@/components/auth/FormField";
import batter from "@/assets/batter.png";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In — CricSea" },
      { name: "description", content: "Sign in to your CricSea account." },
    ],
  }),
  component: SignInPage,
});

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address try again")
    .max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

type FormValues = z.infer<typeof schema>;

function SignInPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    navigate({ to: "/" });
  };

  return (
    <AuthShell imageUrl={batter} imageAlt="Cricket wicket keeper">
      <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-text-primary">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5 max-w-sm">
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
        <div>
          <FormField
            label="Password"
            showPasswordToggle
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <div className="pt-6">
          <SubmitButton loading={isSubmitting}>Sign In</SubmitButton>
        </div>
        <p className="text-center text-xs text-text-secondary pt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-text-primary underline underline-offset-2">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
