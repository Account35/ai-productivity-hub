import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, BookOpen, MessagesSquare, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Disclaimer } from "@/components/OutputPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "A workspace for professionals: write emails, summarise research and ask workplace questions with AI.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Write emails, summarise research and ask workplace questions with AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Turn a few notes into a polished email in a formal, friendly or persuasive tone.",
  },
  {
    to: "/research",
    icon: BookOpen,
    title: "Research Assistant",
    body: "Summarise a topic, pasted article or link into insights and recommendations.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Workplace Chat",
    body: "Ask about meetings, feedback, planning, difficult conversations and more.",
  },
] as const;

function Dashboard() {
  return (
    <AppLayout title="Dashboard" description="Your AI tools for everyday work">
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Get more done with less writing
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This assistant helps you draft professional emails, digest long reading material and
            think through workplace situations. Everything you generate stays in your browser and
            can be edited and copied wherever you need it.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
            >
              <t.icon className="size-5 text-muted-foreground" />
              <h3 className="mt-3 text-sm font-semibold">{t.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
                Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <Disclaimer />
      </div>
    </AppLayout>
  );
}
