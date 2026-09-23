import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | AI Workplace Assistant" },
      {
        name: "description",
        content: "About the AI Workplace Productivity Assistant and responsible AI use.",
      },
      { property: "og:title", content: "Settings" },
      { property: "og:description", content: "How this assistant works and how to use it safely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppLayout title="Settings" description="About this assistant">
      <div className="space-y-4">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Your data</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            There is no account and no database. Nothing you type is stored — everything lives in
            this browser tab and disappears when you refresh or close it.
          </p>
        </section>
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Responsible AI use</h2>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>• AI outputs can be incomplete, outdated or wrong. Review before sending.</li>
            <li>• Check facts, figures, names and dates against a reliable source.</li>
            <li>• Avoid entering confidential or personal information you would not share.</li>
            <li>• You remain responsible for anything you send on to colleagues or clients.</li>
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
