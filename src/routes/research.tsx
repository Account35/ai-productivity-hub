import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, RefreshCw, Copy, Trash2, Check, Loader2 } from "lucide-react";
import { AppShell, PageHeader, Disclaimer } from "@/components/AppShell";
import { generateResearch } from "@/lib/mock-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Workspace AI" },
      {
        name: "description",
        content:
          "Paste a topic, question or article and get a concise summary with key insights and recommendations you can edit.",
      },
      { property: "og:title", content: "AI Research Assistant | Workspace AI" },
      {
        property: "og:description",
        content: "Summarise topics and articles into insights and recommendations.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [insights, setInsights] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasResult = Boolean(summary || insights || recommendations);

  const run = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await generateResearch(input);
    setSummary(res.summary);
    setInsights(res.insights.map((i) => `• ${i}`).join("\n"));
    setRecommendations(res.recommendations.map((r) => `• ${r}`).join("\n"));
    setLoading(false);
  };

  const clearResult = () => {
    setSummary("");
    setInsights("");
    setRecommendations("");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(
      `SUMMARY\n${summary}\n\nKEY INSIGHTS\n${insights}\n\nRECOMMENDATIONS\n${recommendations}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const blocks: { label: string; value: string; set: (v: string) => void; rows: number }[] = [
    { label: "Summary", value: summary, set: setSummary, rows: 7 },
    { label: "Key insights", value: insights, set: setInsights, rows: 7 },
    { label: "Recommendations", value: recommendations, set: setRecommendations, rows: 7 },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          icon={BookOpen}
          title="AI Research Assistant"
          description="Enter a topic, question or paste article text to get a concise summary, key insights and recommendations."
        />

        <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <label htmlFor="research" className="text-sm font-medium text-foreground">
            Topic, question or article text
          </label>
          <textarea
            id="research"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            placeholder="e.g. How should a 12-person team structure weekly reporting without adding meetings?"
            className="mt-2 w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={run}
              disabled={!input.trim() || loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              {loading ? "Researching…" : "Generate research"}
            </button>
            <button
              onClick={() => {
                setInput("");
                clearResult();
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        {hasResult ? (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">Results</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={run}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40"
                >
                  <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
                  Regenerate
                </button>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy all"}
                </button>
                <button
                  onClick={clearResult}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </div>

            {blocks.map((b) => (
              <div key={b.label} className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-foreground">{b.label}</h3>
                <textarea
                  value={b.value}
                  onChange={(e) => b.set(e.target.value)}
                  rows={b.rows}
                  className="mt-3 w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
                />
              </div>
            ))}
          </section>
        ) : (
          <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center">
            <p className="text-sm font-medium text-foreground">Nothing researched yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your summary, key insights and recommendations will appear here — all fully editable.
            </p>
          </div>
        )}

        <Disclaimer />
      </div>
    </AppShell>
  );
}
