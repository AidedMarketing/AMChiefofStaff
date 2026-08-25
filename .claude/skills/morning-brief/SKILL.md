---
name: morning-brief
description: Run the full chief-of-staff morning pass - inbox triage, calendar guard, task routing - and produce Adrian's ranked daily brief. This is what the scheduled weekday Routine calls. Use for "run my morning brief", "do my morning pass", or "be my chief of staff today".
---

# Morning brief

The orchestrator. Runs the whole pass in order and produces one brief.

## 0 — Open the run

```bash
git pull --rebase --autostash 2>/dev/null || true
date +%Y-%m-%d > state/.run-active
```

`state/.run-active` arms the Stop hook. From this point the session cannot end
until today's log is complete. That is the point.

Then confirm connectors. Gmail, Google Calendar, Todoist, Asana, Notion. If one
is missing, note it and continue with the stages you can run — but record the
skip in the log. Never silently drop a stage.

## 1 — Load context

Read `knowledge/SOUL.md`, `knowledge/relationships.md`, `knowledge/priorities.md`,
`knowledge/routing.md`, and `state/pending-responses.md`.

If `priorities.md` has not been reviewed in over 14 days (check its
**Last reviewed** date), say so in the brief. Ranking against stale priorities
is the main way this system goes quietly wrong.

## 2 — Triage the inbox

Run **email-triage**. Hand Meeting-tier threads to calendar-guard as it goes.

## 3 — Guard the calendar

Run **calendar-guard**'s daily scan.

## 4 — Route the tasks

Run **task-routing** over what triage and the calendar surfaced.

## 5 — Chase what's owed

Read `state/pending-responses.md`. Anything past its chase interval (see
`knowledge/routing.md`) gets a short follow-up draft, same rules as any other
draft — saved, never sent.

## 6 — Write the brief

Ranked, short, readable on a phone. This order, and nothing else:

```
## Needs you first
<open questions and draft gaps — the things that block everything else>

## Drafted and waiting (P1 → P3)
<one line each: sender · what they want · complete or gapped>

## Calendar
<only what's wrong. "Clean" if nothing is.>

## Captured
<tasks created, where. Declines called out.>

## Chasing
<who owes Adrian what, and how long it's been>

## Quiet
<counts only: N skipped, N info>
```

If a section is empty, delete the heading. An empty section is noise.

## 7 — Close the run

Write `state/triage-log/YYYY-MM-DD.md` per the structure in `state/README.md`,
update `state/pending-responses.md` and `knowledge/relationships.md`, then:

```bash
rm -f state/.run-active
git add -A && git commit -m "chief-of-staff: morning pass YYYY-MM-DD" && git push
```

Remove `.run-active` **only after** the log is written. The hook is there to
catch the case where you get this wrong; do not treat it as the primary
mechanism.
