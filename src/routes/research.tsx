import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Disclaimer, OutputPanel } from "@/components/OutputPanel";
import { generateAiText } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant | AI Workplace Assistant" },
      {
        name: "description",
        content: "Summarise a topic, article or link into insights and practical recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Get a summary, key insights and recommendations from any reading material.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const run = useServerFn(generateAiText);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!input.trim()) {
      setError("Enter a topic, paste an article, or add a link.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await run({
        data: {
          system:
            "You are a professional research analyst. Given a topic, pasted article text, or a URL, produce a briefing in plain text with these exact sections: 'Summary', 'Key Insights', 'Important Points', 'Practical Recommendations'. Use short bullet points under each heading. If only a URL is given and you cannot open it, reason from what the URL and your knowledge suggest and clearly note that the page content was not read.",
          messages: [{ role: "user" as const, content: input }],
        },
      });
      setOutput(res.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="AI Research Assistant" description="Summaries, insights and next steps">
      <div className="space-y-5">
        <div className="space-y-4 rounded-xl border border-border bg-card p-5">
          <label className="text-sm font-medium">Topic, article text, or URL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Paste an article, type a topic like 'hybrid work policies in 2026', or drop a link."
            className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-foreground/30"
          />
          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "Analysing..." : "Generate briefing"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {output && <OutputPanel value={output} onChange={setOutput} label="Research briefing" rows={20} />}
        <Disclaimer />
      </div>
    </AppLayout>
  );
}
