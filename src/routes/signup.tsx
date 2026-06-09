import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthShell } from "@/components/AuthShell";
import { FormField, SubmitButton } from "@/components/auth/FormField";
import hero from "@/assets/hero.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — CricSea" },
      { name: "description", content: "Create your CricSea account." },
    ],
  }),
  component: SignUpPage,
});

const nameRule = z
  .string()
  .trim()
  .min(2, "Must have at least two letters and no unusual characters.")
  .max(50)
  .regex(/^[A-Za-z][A-Za-z' -]*$/, "Must have at least two letters and no unusual characters.");

const schema = z
  .object({
    firstName: nameRule.refine((v) => v.length >= 2, {
      message: "Your first name must have at least two letters and no unusual characters.",
    }),
    lastName: nameRule.refine((v) => v.length >= 2, {
      message: "Your last name must have at least two letters and no unusual characters.",
    }),
    email: z.string().trim().min(1, "Email is required").email("Invalid email address").max(255),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128)
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
    agreed: z.literal(true, { errorMap: () => ({ message: "Please accept the terms" }) }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Confirm password not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    navigate({ to: "/verify-otp" });
  };

  return (
    <AuthShell imageUrl={hero} imageAlt="Cricket stadium">
      <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-text-primary">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 max-w-md">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="First Name"
            placeholder="Enter your first name"
            autoComplete="given-name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <FormField
            label="Last Name"
            placeholder="Enter your last name"
            autoComplete="family-name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>
        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label="Password"
          showPasswordToggle
          placeholder="Enter your password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <FormField
          label="Confirm Password"
          showPasswordToggle
          placeholder="Enter your confirm password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <label className="flex items-start gap-2 text-xs text-text-secondary select-none cursor-pointer">
          <input
            type="checkbox"
            {...register("agreed")}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
          />
          <span>
            I agree to <span className="font-semibold text-text-primary">terms &amp; conditions</span>
          </span>
        </label>
        {errors.agreed && (
          <p className="text-xs font-medium text-danger">{errors.agreed.message}</p>
        )}
        <div className="pt-3">
          <SubmitButton loading={isSubmitting}>Sign in</SubmitButton>
        </div>
        <p className="text-center text-xs text-text-secondary">
          I already have an account.{" "}
          <Link to="/signin" className="font-semibold text-text-primary underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
