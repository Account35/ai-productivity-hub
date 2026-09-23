import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function OutputPanel({
  value,
  onChange,
  label = "AI output",
  rows = 14,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  rows?: number;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-sm font-medium">{label}</span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs transition-colors hover:bg-accent"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-y rounded-b-lg bg-transparent p-4 text-sm leading-relaxed outline-none"
      />
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
      Responsible AI: outputs are generated automatically and may be inaccurate. Review and edit
      before sending or sharing professionally.
    </p>
  );
}
