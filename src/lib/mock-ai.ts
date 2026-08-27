export type Tone = "formal" | "friendly" | "persuasive";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const openers: Record<Tone, string[]> = {
  formal: ["Dear Colleague,", "Dear Team,", "Good day,"],
  friendly: ["Hi there,", "Hey team,", "Hello,"],
  persuasive: ["Hi,", "Hello,", "Good morning,"],
};

const closers: Record<Tone, string[]> = {
  formal: ["Kind regards,", "Sincerely,", "Yours faithfully,"],
  friendly: ["Thanks so much,", "Cheers,", "Talk soon,"],
  persuasive: ["Looking forward to your decision,", "Thanks in advance,", "Best regards,"],
};

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function subjectFrom(brief: string) {
  const words = brief.replace(/\s+/g, " ").trim().split(" ").slice(0, 8).join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1).replace(/[.,;:]$/, "");
}

export async function generateEmail(brief: string, tone: Tone): Promise<string> {
  await delay(900);
  const subject = subjectFrom(brief);
  const body: Record<Tone, string> = {
    formal: `I am writing to you regarding ${brief.trim().replace(/\.$/, "")}.

To provide context, this matter affects our current priorities and I would appreciate your input so that we can proceed without unnecessary delay. Please find the key points summarised below:

• Purpose: ${subject}
• Requested action: your review and confirmation
• Suggested timeline: within the next three working days

Should you require any further detail, I would be glad to arrange a short call at your convenience. Thank you for your time and consideration.`,
    friendly: `Hope you're having a good week! I wanted to reach out about ${brief.trim().replace(/\.$/, "")}.

Here's the short version:

• What it's about: ${subject}
• What I need: a quick look and your thoughts
• When: whenever you get a gap in the next few days

No rush if you're heads-down — just let me know what works and I'll fit around you. Happy to jump on a quick call if that's easier than typing it all out.`,
    persuasive: `I wanted to bring something to your attention that I believe is worth a few minutes of your time: ${brief.trim().replace(/\.$/, "")}.

Three reasons this matters right now:

1. It removes a recurring source of wasted effort for the team.
2. The change is low-risk and can be reversed if it doesn't land well.
3. Acting this week means we see the benefit inside the current cycle.

If you're open to it, I can put together a one-page outline and we can decide from there. A quick yes is all I need to get started.`,
  };

  return `Subject: ${subject}

${pick(openers[tone])}

${body[tone]}

${pick(closers[tone])}
[Your name]`;
}

export type ResearchResult = {
  summary: string;
  insights: string[];
  recommendations: string[];
};

export async function generateResearch(input: string): Promise<ResearchResult> {
  await delay(1000);
  const topic = input.replace(/\s+/g, " ").trim().split(" ").slice(0, 10).join(" ");
  return {
    summary: `The material provided centres on ${topic}. At a high level, it describes a situation where current practice delivers acceptable results but leaves measurable value on the table. The strongest signal is that outcomes improve when responsibilities are made explicit and feedback loops are shortened, rather than when additional tooling is introduced. Constraints worth noting are limited attention from stakeholders, uneven data quality, and the cost of changing habits that are already embedded in day-to-day work.`,
    insights: [
      `Most of the impact around "${topic}" comes from a small number of repeated decisions rather than one-off events.`,
      "Teams consistently overestimate the benefit of new tools and underestimate the benefit of clearer ownership.",
      "Short, regular review cycles surface problems roughly twice as fast as monthly reporting.",
      "Documentation quality is the strongest predictor of how quickly new contributors become productive.",
    ],
    recommendations: [
      "Define a single owner and a written success measure before committing further effort.",
      "Run a two-week pilot with one team and capture before/after numbers on the metric that matters.",
      "Replace one long status meeting with a short written update to protect focus time.",
      "Schedule a review at the end of the pilot with an explicit decision: scale, adjust, or stop.",
    ],
  };
}

const chatReplies: { match: RegExp; reply: string }[] = [
  {
    match: /plan|day|schedule|prioriti/i,
    reply: `Here's a workable shape for your day:

**Morning (deep focus)**
- Block 90 minutes for the single task with the highest consequence if it slips.
- Keep notifications off; capture interruptions on a scratch list instead of acting on them.

**Midday (collaboration)**
- Group calls and reviews back-to-back so your afternoon stays intact.
- Answer messages in two batches rather than continuously.

**Afternoon (finishing)**
- Close out anything that is 80% done before starting something new.
- Spend the last 10 minutes writing tomorrow's top three.

Tell me your actual commitments and I'll slot them in.`,
  },
  {
    match: /summar/i,
    reply: `Paste the text and I'll return it in this structure:

1. **Bottom line** — one sentence a busy manager can act on.
2. **Key points** — three to five bullets, facts only.
3. **Open questions** — anything the source leaves unresolved.
4. **Suggested next step** — the smallest useful action.

For longer documents, tell me who the summary is for and I'll adjust the level of detail.`,
  },
  {
    match: /respon|reply|email|message/i,
    reply: `A reliable structure for a professional response:

- **Acknowledge** the request in one line so the sender knows you've read it.
- **Answer** the actual question directly, before any context.
- **Explain** briefly only where it changes what the reader should do.
- **Close** with the specific next step and a date.

Share the message you received and the outcome you want, and I'll draft it in a formal, friendly, or persuasive tone.`,
  },
  {
    match: /productiv|focus|efficien|improv/i,
    reply: `Four changes that tend to pay off quickly:

1. **Protect one focus block a day.** Two uninterrupted hours usually beats a full fragmented day.
2. **Make work visible.** A shared board removes most "where is this?" messages.
3. **Default to written updates.** They're searchable and cost the team far less time than a meeting.
4. **Review weekly, not quarterly.** Small corrections early prevent large rewrites later.

Pick one, run it for two weeks, and measure a single number before deciding whether to keep it.`,
  },
];

export async function generateChatReply(message: string): Promise<string> {
  await delay(800);
  const found = chatReplies.find((r) => r.match.test(message));
  if (found) return found.reply;
  return `Here's how I'd approach "${message.trim()}":

- **Clarify the outcome.** What does a good result look like, and who decides?
- **Find the constraint.** Time, information, or a pending approval — usually one of the three is blocking.
- **Take the smallest next step.** Draft, ask, or decide something concrete today.
- **Set a checkpoint.** Agree when you'll review progress, so the work doesn't drift.

If you give me more detail — the people involved, the deadline, and what's already been tried — I can turn this into a specific plan.`;
}
