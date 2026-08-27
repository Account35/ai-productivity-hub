import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, BookOpen, MessagesSquare, ArrowRight, Sparkle } from "lucide-react";
import { AppShell, Disclaimer } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workspace AI — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft emails, summarise research and get workplace answers in one clean AI productivity workspace.",
      },
      { property: "og:title", content: "Workspace AI — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Draft emails, summarise research and get workplace answers in one clean AI productivity workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    description:
      "Turn a rough brief into a polished email in a formal, friendly or persuasive tone.",
  },
  {
    to: "/research",
    icon: BookOpen,
    title: "AI Research Assistant",
    description: "Summarise a topic or article into key insights and clear recommendations.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Workplace Chatbot",
    description: "Ask workplace questions and plan your day in a conversational assistant.",
  },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-10">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-9">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Sparkle className="h-3 w-3" />
            Workplace productivity suite
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Do the writing, reading and thinking work faster.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Three focused assistants for the tasks that fill your day: drafting professional email,
            condensing research into decisions, and answering everyday workplace questions.
          </p>
          <Link
            to="/email"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start with an email
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">Tools</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(({ to, icon: Icon, title, description }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
