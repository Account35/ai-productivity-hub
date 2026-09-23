import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, SendHorizonal } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Disclaimer } from "@/components/OutputPanel";
import { generateAiText } from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat | AI Workplace Assistant" },
      {
        name: "description",
        content: "Ask workplace questions and get practical, professional answers from AI.",
      },
      { property: "og:title", content: "AI Workplace Chat" },
      {
        property: "og:description",
        content: "A chat assistant for meetings, feedback, planning and tricky work situations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

const SYSTEM =
  "You are a pragmatic workplace productivity coach for professionals. Answer workplace questions clearly and concisely with concrete, actionable advice. Use short paragraphs or bullet points. Ask a clarifying question when the request is ambiguous. Avoid legal, medical or HR-compliance guarantees, and say when a human expert should be involved. Return plain text.";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const suggestions = [
  "Help me prepare an agenda for a 30-minute team sync",
  "How do I give constructive feedback to a defensive colleague?",
  "Turn my rough notes into a weekly status update",
];

function ChatPage() {
  const run = useServerFn(generateAiText);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await run({
        data: {
          system: SYSTEM,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        },
      });
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: res.text },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (m: Msg) => {
    try {
      await navigator.clipboard.writeText(m.content);
      setCopiedId(m.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <AppLayout title="AI Workplace Chat" description="Ask anything about your work day">
      <div className="space-y-4">
        <div className="min-h-[50vh] space-y-5 rounded-xl border border-border bg-card p-5">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Start a conversation, or try one of these:
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-md border border-border px-3 py-2 text-left text-xs transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-lg bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="space-y-2">
                <textarea
                  value={m.content}
                  onChange={(e) =>
                    setMessages((prev) =>
                      prev.map((x) => (x.id === m.id ? { ...x, content: e.target.value } : x)),
                    )
                  }
                  rows={Math.min(20, Math.max(3, m.content.split("\n").length + 2))}
                  className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm leading-relaxed outline-none"
                />
                <button
                  onClick={() => copy(m)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent"
                >
                  {copiedId === m.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copiedId === m.id ? "Copied" : "Copy"}
                </button>
              </div>
            ),
          )}

          {loading && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Thinking...
            </p>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={2}
            placeholder="Ask a workplace question..."
            className="flex-1 resize-none bg-transparent p-2 text-sm outline-none"
          />
          <button
            onClick={() => void send(input)}
            disabled={loading || !input.trim()}
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50",
            )}
            aria-label="Send message"
          >
            <SendHorizonal className="size-4" />
          </button>
        </div>

        <Disclaimer />
      </div>
    </AppLayout>
  );
}
