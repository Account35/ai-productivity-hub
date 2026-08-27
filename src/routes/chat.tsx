import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessagesSquare, SendHorizonal, Trash2, Loader2, User } from "lucide-react";
import { AppShell, PageHeader, Disclaimer } from "@/components/AppShell";
import { generateChatReply } from "@/lib/mock-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot | Workspace AI" },
      {
        name: "description",
        content:
          "Ask workplace questions, plan your day and draft professional responses in a clean AI chat interface.",
      },
      { property: "og:title", content: "AI Workplace Chatbot | Workspace AI" },
      {
        property: "og:description",
        content: "A conversational assistant for everyday workplace questions.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { id: number; role: "user" | "assistant"; content: string };

const suggestions = [
  "Help me plan my workday",
  "Summarise this information",
  "Help me write a professional response",
  "Give me ideas for improving productivity",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setMessages((m) => [...m, { id: Date.now(), role: "user", content: trimmed }]);
    setLoading(true);
    const reply = await generateChatReply(trimmed);
    setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader
            icon={MessagesSquare}
            title="AI Workplace Chatbot"
            description="Ask workplace questions, plan your day or work through a tricky message."
          />
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear conversation
            </button>
          )}
        </div>

        <section className="flex min-h-[26rem] flex-col rounded-xl border border-border bg-card">
          <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
            {messages.length === 0 && !loading ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground">
                  <MessagesSquare className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-medium text-foreground">Start a conversation</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Pick a suggested prompt below or type your own workplace question.
                </p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {m.role === "user" ? <User className="h-4 w-4" /> : "AI"}
                  </span>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-xl rounded-tr-sm bg-primary px-4 py-2.5 text-primary-foreground"
                        : "text-foreground",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-foreground">
                  AI
                </span>
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={loading}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={2}
                placeholder="Ask a workplace question…"
                className="flex-1 resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
