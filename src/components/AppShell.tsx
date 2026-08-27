import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  BookOpen,
  MessagesSquare,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/research", label: "AI Research Assistant", icon: BookOpen },
  { to: "/chat", label: "AI Workplace Chatbot", icon: MessagesSquare },
] as const;

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>
        AI-generated content can be inaccurate or incomplete. Please review and edit it before using
        it for important workplace decisions or communications.
      </span>
    </p>
  );
}

export function PageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const sidebar = (
    <div className="flex h-full flex-col gap-6 border-r border-sidebar-border bg-sidebar px-4 py-6">
      <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
          W
        </span>
        <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
          Workspace AI
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Disclaimer />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64">{sidebar}</div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
          >
            {open ? <Menu className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-semibold tracking-tight">Workspace AI</span>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}

