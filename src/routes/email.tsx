import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, RefreshCw, Copy, Trash2, Check, Loader2 } from "lucide-react";
import { AppShell, PageHeader, Disclaimer } from "@/components/AppShell";
import { generateEmail, type Tone } from "@/lib/mock-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Workspace AI" },
      {
        name: "description",
        content:
          "Describe what you need to say and generate a polished workplace email in a formal, friendly or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator | Workspace AI" },
      {
        property: "og:description",
        content: "Generate professional workplace emails from a short brief.",
      },
    ],
  }),
  component: EmailPage,
});

const tones: { value: Tone; label: string; hint: string }[] = [
  { value: "formal", label: "Formal", hint: "Measured and professional" },
  { value: "friendly", label: "Friendly", hint: "Warm and conversational" },
  { value: "persuasive", label: "Persuasive", hint: "Confident and action-driving" },
];

function EmailPage() {
  const [brief, setBrief] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (!brief.trim()) return;
    setLoading(true);
    setOutput(await generateEmail(brief, tone));
    setLoading(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          icon={Mail}
          title="Smart Email Generator"
          description="Describe what the email needs to say, pick a tone, and get a draft you can edit and send."
        />

        <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <label htmlFor="brief" className="text-sm font-medium text-foreground">
            What should the email say?
          </label>
          <textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={5}
            placeholder="e.g. Ask the design team for final assets by Thursday and explain the launch deadline moved forward."
            className="mt-2 w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"
          />

          <p className="mt-5 text-sm font-medium text-foreground">Tone</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {tones.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTone(t.value)}
                className={cn(
                  "rounded-lg border px-3.5 py-3 text-left transition-colors",
                  tone === t.value
                    ? "border-foreground bg-secondary"
                    : "border-border bg-background hover:border-foreground/30",
                )}
              >
                <span className="block text-sm font-medium text-foreground">{t.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{t.hint}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={run}
              disabled={!brief.trim() || loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {loading ? "Generating…" : "Generate email"}
            </button>
            <button
              onClick={() => {
                setBrief("");
                setOutput("");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">Generated email</h2>
            {output && (
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
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={() => setOutput("")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {output ? (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={18}
              className="mt-4 w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 font-mono text-sm leading-relaxed text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
            />
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-border px-6 py-12 text-center">
              <p className="text-sm font-medium text-foreground">No draft yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a short brief above and choose a tone — your editable draft will appear here.
              </p>
            </div>
          )}
        </section>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
