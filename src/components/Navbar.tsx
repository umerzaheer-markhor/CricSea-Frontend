import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const NAV_ITEMS = [
  { label: "Home", to: "/" as const },
  { label: "About Us", to: undefined },
  { label: "Contact us", to: undefined },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const isActive = (label: string, to?: string) => {
    if (to === "/") return pathname === "/";
    return activeLabel === label;
  };

  return (
    <header className="sticky top-0 z-50 isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 glass-nav-blur" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex min-w-0 items-center gap-6 lg:gap-10">
          <Link to="/" className="hover-scale inline-block shrink-0">
            <img src={logo} alt="CricSea" className="h-7 sm:h-8 w-auto" />
          </Link>

          <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.label, item.to);
              const className = cn(
                "relative pb-0.5 transition-colors",
                active ? "text-primary" : "text-text-primary hover:text-primary",
              );

              return (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} className={cn(className, "link-underline")}>
                      {item.label}
                      {active && (
                        <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-primary" />
                      )}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveLabel(item.label)}
                      className={cn(className, "link-underline")}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-primary" />
                      )}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            className="hidden sm:inline-flex rounded-md px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-primary-foreground btn-cta"
          >
            Control Match
          </button>
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground glow-primary">
            DM
          </div>

          <ThemeToggle className="sm:hidden" />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary"
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-full bg-text-primary transition-transform",
                  menuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 h-0.5 w-full bg-text-primary transition-opacity",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-4 h-0.5 w-full bg-text-primary transition-transform",
                  menuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="relative md:hidden border-t border-[var(--glass-border)]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-3 text-sm font-semibold">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.label, item.to);
                const itemClass = cn(
                  "block w-full text-left rounded-md px-2 py-1.5 transition-colors",
                  active ? "text-primary bg-primary/10" : "text-text-primary hover:text-primary hover:bg-surface",
                );

                return (
                  <li key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        className={itemClass}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={itemClass}
                        onClick={() => {
                          setActiveLabel(item.label);
                          setMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
              <li className="pt-2 border-t border-border">
                <button
                  type="button"
                  className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground btn-cta"
                >
                  Control Match
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
