# Chief of Staff

A Claude Code system that triages `adrian@aidedmarketing.com` every weekday
morning, checks the calendar, routes commitments into Todoist / Asana / Notion,
and hands back one ranked brief with drafts already sitting in Gmail.

Modelled on the pattern in [Matt Paige's chief-of-staff
tutorial](https://mattpaige68.substack.com/p/how-i-turned-claude-code-into-my)
and the public [chief-of-staff agent
spec](https://github.com/affaan-m/everything-claude-code/blob/main/agents/chief-of-staff.md).

## How it works

```
Routine (weekday 07:00 ET)
   └─ morning-brief ────────────────────────────────┐
        ├─ email-triage    skip / info / meeting / action, ranked P1–P3
        │    └─ draft-writer (subagent)  voice-matched drafts, >5 threads
        ├─ calendar-guard  conflicts, prep gaps, availability answers
        ├─ task-routing    commitments → Todoist / Asana / Notion
        └─ Stop hook ──────────────────────────────┘
             refuses to end the run until the log is complete and committed
```

Three ideas carry the whole thing:

1. **Knowledge lives in git, not in context.** Sessions are ephemeral. `SOUL.md`,
   `relationships.md`, `priorities.md` and the triage logs are the memory.
2. **Hooks over prompts.** Instructions get dropped; a file check does not. The
   `Stop` hook blocks a half-finished run rather than trusting a checklist.
3. **Drafts, never sends.** The agent's output is a draft in Gmail. Adrian is
   always the one who hits send.

## Setup

### 1. Enable the connectors

Gmail, Google Calendar, Todoist, Asana and Notion are installed on the account
but several are toggled **off** per-session. Turn them on in the session's
connector settings before the first run, or every stage after triage silently
degrades.

### 2. Fill in `knowledge/SOUL.md`

**This is the step that determines whether the system is useful.** Everything
else is plumbing. Open a session here and run:

> Pull my last 30 sent emails from Gmail, ignore one-liners, and derive my actual
> voice rules — sentence length, openings, sign-offs, how I say no, words I never
> use. Rewrite `knowledge/SOUL.md` with what you find and show me the evidence
> for each rule.

Then correct what it got wrong. Do the same for `relationships.md` (start with
the ten people you email most) and `priorities.md` (current engagements).

### 3. Dry-run it

> Run the morning brief, but classify and report only — no drafts, no tasks, no
> archiving.

Check the tiers against what you'd have done yourself. Fix `relationships.md`
and `priorities.md` where it guessed wrong. Repeat until the ranking looks like
your own judgment, then let it draft.

### 4. Schedule it

From a Claude Code session **on this repo** (not another one — the Routine
inherits the session's environment):

> Create a Routine called "Morning brief" that fires a fresh session every
> weekday at `0 11 * * 1-5` UTC with the connectors Gmail, Google Calendar,
> Todoist, Asana and Notion, and the prompt: "Run the morning-brief skill for
> today. Full pass. Report the brief when done."

And for Fridays:

> Same, called "Weekly review", cron `0 20 * * 5`, prompt: "Run the
> weekly-review skill for this week."

**Cron is UTC.** `0 11` is 07:00 Eastern during EDT and 06:00 during EST — shift
to `0 12` when the clocks go back in November, or accept the hour.

## Running it by hand

Any of these work in a session on this repo:

- "Run my morning brief"
- "Triage my inbox"
- "What's my day look like" → calendar-guard
- "What did I commit to this week" → task-routing

## Guardrails

Set in `CLAUDE.md`, and worth knowing:

- Never sends. Drafts only.
- Archives only senders explicitly listed in `knowledge/routing.md`.
- Never accepts, declines or moves a meeting involving another person.
- Never invents a price, date, availability or scope commitment — gaps come back
  as `[ADRIAN: ...]` in the draft and at the top of the brief.
- `adrian@aidedmarketing.com` only. FIU / Florida SBDC mail is deliberately out
  of scope.

## Keeping it honest

The weekly review is not optional garnish — it is the maintenance pass. It diffs
what the agent drafted against what Adrian actually sent, and turns the wording
edits into `SOUL.md` rules and the substance edits into `priorities.md` gaps.
Skip it for a month and the system quietly decays into a mail sorter.

## Privacy

Private repo, deliberately. It accumulates correspondence context: who Adrian
works with, what they're paying for, how he talks to them. `.gitignore` blocks
raw mail files and credentials. Keep it that way.
