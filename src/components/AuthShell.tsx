import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png";

interface AuthShellProps {
  children: ReactNode;
  imageUrl: string;
  imageAlt: string;
}

export function AuthShell({ children, imageUrl, imageAlt }: AuthShellProps) {
  return (
    <div className="relative min-h-dvh w-full bg-background mesh-bg flex items-center justify-center px-4 py-8 sm:py-12 overflow-hidden">
      {/* ambient glow accents */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary blur-3xl animate-green-glow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary blur-3xl animate-green-glow-alt" />
      <div className="relative w-full max-w-6xl animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 rounded-3xl glass-card p-6 sm:p-8 md:p-10">
          <div className="flex flex-col">
            <Link to="/" className="inline-block">
              <img src={logo} alt="CricSea" className="h-9 w-auto" />
            </Link>
            <div className="mt-8 md:mt-10 flex-1">{children}</div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-lg)]">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-full w-full object-cover animate-fade-in-slow"
                loading="lazy"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
