---
name: morning-brief
description: Run the full chief-of-staff morning pass - inbox triage, calendar guard, task routing - and produce Adrian's ranked daily brief. This is what the scheduled daily Routine calls. Use for "run my morning brief", "do my morning pass", or "be my chief of staff today".
---

# Morning brief

**This skill is mechanics only.** Everything about what the brief says and how
it's formatted — role, tone, data sources, VIP derivation, the news filter,
section structure, and delivery — lives in `routines/morning-brief.md`. Read it
in full and follow it for content. This skill supplies the run scaffolding
around it: opening and closing the run, invoking the other skills for their
detailed rules, and writing the two durable records. If this file and the
routine prompt ever seem to disagree about what the brief should contain, the
routine prompt wins — fix this file, not your output.

## 0 — Open the run

```bash
git pull --rebase --autostash 2>/dev/null || true
date +%Y-%m-%d > state/.run-active
```

`state/.run-active` arms the Stop hook. From this point the session cannot end
until today's operational log is complete. That is the point.

Then confirm connectors against the routine prompt's Data sources list —
Google Calendar, Gmail, Todoist, Asana, Notion, GitHub, web search. If one is
missing, say which one at the top of the brief per the routine prompt's
instruction, and record the skip in the operational log below. Never silently
drop a source.

## 1 — Load context

Read `knowledge/relationships.md`, `knowledge/priorities.md`, `knowledge/routing.md`,
and `memory.md` (repo root — create it if this is the first run). The routine
prompt tells you what to do with each; this step just makes sure they're loaded
before you start.

If `priorities.md` has not been reviewed in over 14 days (check its
**Last reviewed** date), say so in the brief. Ranking against stale priorities
is the main way this system goes quietly wrong.

## 2 — Triage the inbox

Run **email-triage** for the detailed tiering, drafting, and voice rules. Hand
Meeting-tier threads to calendar-guard as it goes. Fold its output into the
routine prompt's Needs My Response and Today's Schedule sections.

## 3 — Guard the calendar

Run **calendar-guard**'s daily scan for the buffer math and conflict rules.
Fold its output into Today's Schedule.

## 4 — Route the tasks

Run **task-routing** for the dedup and destination rules. Fold its output into
Must-Do Today.

## 5 — Compose and deliver

Follow `routines/morning-brief.md` for the brief's structure, tone, and
delivery (Notion page, Gmail-draft fallback, full markdown in session output).
This skill does not define the brief's shape — see the note at the top.

## 6 — Close the run

Write two records before the run ends:

**The operational log** — `state/triage-log/YYYY-MM-DD.md`, per the structure
in `state/README.md`. This is the detailed record of today's run: every
thread's tier, every draft's status, connector skips, archive candidates. The
Stop hook checks this file exists and is complete.

**memory.md** — per the routine prompt's Memory protocol section: Active
Commitments, Watched Threads, VIPs Owed Response, At-Risk or Accelerating
Client Work, Story Angles, Patterns. This is the rolled-up, pruned, cross-day
memory the routine prompt reads at the start of every future run — a different
grain than the operational log, not a duplicate of it.

Also update `state/pending-responses.md` and set `Last touch` in
`knowledge/relationships.md` for everyone drafted to.

Then:

```bash
rm -f state/.run-active
git add -A && git commit -m "chief-of-staff: morning pass YYYY-MM-DD" && git push
```

Remove `.run-active` **only after** both records are written. The hook is
there to catch the case where you get this wrong; do not treat it as the
primary mechanism.
