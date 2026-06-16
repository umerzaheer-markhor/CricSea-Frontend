import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  PanelLeftClose,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const SIDEBAR_WIDTH = 272;

const NAV_ITEMS = [
  { label: "Organizer", to: "/dashboard" as const, icon: LayoutDashboard, match: "/dashboard" },
  { label: "Manage Cricket", to: "/dashboard/manage-cricket" as const, icon: Trophy, match: "/dashboard/manage-cricket" },
  { label: "Create Club", to: "/dashboard/create-club" as const, icon: Building2, match: "/dashboard/create-club" },
  { label: "Contact Us", to: "/dashboard/contact-us" as const, icon: Mail, match: "/dashboard/contact-us" },
] as const;

const USER = {
  name: "David Adams",
  email: "davidadams3713@gmail.com",
  initials: "DA",
  role: "Organizer",
};

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Organizer",
  "/dashboard/": "Organizer",
  "/dashboard/manage-cricket": "Manage Cricket",
  "/dashboard/create-club": "Create Club",
  "/dashboard/contact-us": "Contact Us",
  "/dashboard/tournaments": "Tournaments",
};

function getDashboardTitle(pathname: string) {
  if (pathname.startsWith("/dashboard/manage-cricket")) {
    return "Manage Cricket";
  }
  if (pathname.startsWith("/dashboard/create-club")) {
    return "Create Club";
  }
  if (pathname.startsWith("/dashboard/contact-us")) {
    return "Contact Us";
  }
  if (pathname.startsWith("/dashboard/tournaments")) {
    return "Tournaments";
  }
  return PAGE_TITLES[pathname] ?? "Organizer";
}

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = getDashboardTitle(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      setSidebarOpen(desktop);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (sidebarOpen && !isDesktop) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [sidebarOpen, isDesktop]);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const sidebarContent = (
    <div className="flex h-full flex-col text-white antialiased">
      {/* Brand */}
      <div className="px-5 pb-4 pt-6">
        <Link
          to="/"
          onClick={() => {
            if (!isDesktop) closeSidebar();
          }}
          className="inline-flex items-center gap-2.5"
        >
          <img src={logo} alt="CricSea" className="h-8 w-auto brightness-0 invert" />
        </Link>
      </div>

      {/* Profile card */}
      <div className="px-4 pb-6">
        <div className="rounded-2xl border border-white/20 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold tracking-tight text-[#0b5c34] shadow-sm">
              {USER.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15px] font-bold leading-tight tracking-tight text-white">
                {USER.name}
              </p>
              <p className="mt-0.5 truncate text-[12px] font-medium leading-snug text-white/85">
                {USER.email}
              </p>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center rounded-lg bg-white/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            {USER.role}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
          Main menu
        </p>
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.match === "/dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/"
                : item.match
                  ? pathname === item.match || pathname.startsWith(`${item.match}/`)
                  : false;

            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => {
                    if (!isDesktop) closeSidebar();
                  }}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-200",
                    active
                      ? "bg-white text-[#0b5c34] shadow-sm card-selected-glow"
                      : "text-white hover:bg-white/12",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                      active
                        ? "bg-[#0b5c34]/10 text-[#0b5c34]"
                        : "bg-white/10 text-white group-hover:bg-white/15",
                    )}
                  >
                    <Icon className="h-[17px] w-[17px]" strokeWidth={2.25} />
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Log out */}
      <div className="border-t border-white/15 p-4">
        <Link
          to="/signin"
          onClick={() => {
            if (!isDesktop) closeSidebar();
          }}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold tracking-tight text-white transition-colors hover:bg-white/10"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/15">
            <LogOut className="h-[17px] w-[17px]" strokeWidth={2.25} />
          </span>
          Log Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={closeSidebar}
        className={cn(
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-[3px] transition-opacity duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        style={{ width: SIDEBAR_WIDTH }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden",
          "bg-[#0b5c34] shadow-[4px_0_24px_rgba(0,0,0,0.12)]",
          "transition-transform duration-300 ease-in-out will-change-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!sidebarOpen}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,transparent_32%,rgba(0,0,0,0.08)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-[18%] h-44 w-44 rounded-full bg-primary blur-3xl animate-green-glow opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-[22%] h-32 w-32 rounded-full bg-primary blur-2xl animate-green-glow-alt opacity-25"
        />
        <div className="relative flex h-full flex-col">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeSidebar}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 lg:hidden"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
          {sidebarContent}
        </div>
      </aside>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-[272px]" : "lg:ml-0",
        )}
      >
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={sidebarOpen}
              onClick={toggleSidebar}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-primary transition-colors hover:border-primary/35 hover:bg-primary/5 hover:text-primary"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
            <h1 className="font-display text-lg font-bold tracking-tight text-text-primary sm:text-xl">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link to="/" className="hover-scale shrink-0">
              <img src={logo} alt="CricSea" className="h-7 w-auto sm:h-8" />
            </Link>
          </div>
        </header>

        <main className="relative flex-1 overflow-x-clip bg-background mesh-bg">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-primary blur-3xl animate-green-glow opacity-[0.22]" />
            <div
              className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary blur-3xl animate-green-glow-alt opacity-[0.18]"
              style={{ animationDelay: "2s" }}
            />
          </div>
          <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div key={pathname} className="animate-fade-up">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
