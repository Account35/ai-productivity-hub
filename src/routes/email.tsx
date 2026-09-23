import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Disclaimer, OutputPanel } from "@/components/OutputPanel";
import { generateAiText } from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content: "Generate professional emails in a formal, friendly or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      { property: "og:description", content: "Turn short notes into a polished work email." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

const tones = ["Formal", "Friendly", "Persuasive"] as const;

function EmailPage() {
  const run = useServerFn(generateAiText);
  const [details, setDetails] = useState("");
  const [tone, setTone] = useState<(typeof tones)[number]>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!details.trim()) {
      setError("Please describe what the email should say.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await run({
        data: {
          system:
            "You are an expert business communication writer. Write a complete, ready-to-send workplace email. Always include a subject line, greeting, well-structured body paragraphs and a sign-off. Keep it concise and free of placeholder text unless the user omits a detail, in which case use a clearly marked [placeholder]. Return plain text only.",
          messages: [
            {
              role: "user" as const,
              content: `Tone: ${tone}\n\nEmail purpose and details:\n${details}`,
            },
          ],
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
    <AppLayout title="Smart Email Generator" description="Draft a professional email in seconds">
      <div className="space-y-5">
        <div className="space-y-4 rounded-xl border border-border bg-card p-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">What is the email about?</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              placeholder="e.g. Ask the design team for updated mockups by Friday, mention the client review on Monday."
              className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-foreground/30"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Tone</span>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm transition-colors",
                    tone === t
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "Writing email..." : "Generate email"}
          </button>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {output && (
          <OutputPanel value={output} onChange={setOutput} label="Generated email" />
        )}
        <Disclaimer />
      </div>
    </AppLayout>
  );
}
