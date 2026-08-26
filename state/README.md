# state/ — the run record

Ephemeral sessions, durable repo. Nothing here is scratch; it is the memory.

This directory holds the **operational** record — the detailed, per-run log
that the Stop hook checks. It's a different grain from `memory.md` at the repo
root, which is the rolled-up, pruned, cross-day memory the Morning Brief
routine prompt (`routines/morning-brief.md`) reads and writes each run. Both
get written every run; neither replaces the other.

## `triage-log/YYYY-MM-DD.md`

One per run. The Stop hook checks this file, so the headings below are load-bearing
— it will refuse to end a run that is missing any of them, or that has an
unchecked follow-through box.

```markdown
# Triage — YYYY-MM-DD

**Run:** morning | ad-hoc
**Connectors available:** Gmail, Calendar, Todoist, Asana, Notion
**Stages skipped:** none

## Open questions
<!-- Draft gaps and decisions only Adrian can make. Empty is fine; the heading is not. -->
- [ADRIAN: ...] on <thread> — <what's needed>

## Action
| P | Sender | Wants | Draft |
|---|---|---|---|
| P1 | Name <email> | one line | complete / gapped |

## Meeting
| Sender | Proposed | Calendar says | Draft |
|---|---|---|---|

## Info
<!-- No reply needed. Note anything routed to Notion. -->
- Sender — what it was — routed to: —

## Skip
**Count:** N archived, N left in place

### Archive candidates
<!-- Repeat Skip senders not yet in routing.md. Proposals only. -->
- sender@domain — seen N times

### New senders
<!-- Appended to relationships.md under Unfiled. -->
- Name <email> — first seen

## Follow-through
- [ ] Drafts saved to Gmail (not sent)
- [ ] `state/pending-responses.md` updated — added new, cleared returned
- [ ] `knowledge/relationships.md` — `Last touch` set for everyone drafted to
- [ ] New senders appended under Unfiled
- [ ] Tasks created or consciously declined, per `knowledge/routing.md`
- [ ] Calendar scan run, findings in the brief
- [ ] Committed and pushed
```

## `pending-responses.md`

Threads where **Adrian is waiting on someone else**. Not a task list — the
morning brief reads this to decide who to chase, using the intervals in
`knowledge/routing.md`.

## `weekly-review/YYYY-Www.md`

Friday rollup, written by the weekly-review skill. Also where proposed
knowledge-file changes sit until Adrian approves them.

## `.run-active`

Present only during a run. Contains the run date. Arms the Stop hook.
Gitignored — it is a lock, not a record.
