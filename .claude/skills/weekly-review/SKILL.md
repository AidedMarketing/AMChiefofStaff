---
name: weekly-review
description: Friday rollup of the week's triage logs plus maintenance of the knowledge files - stale priorities, unfiled senders, archive candidates, drafts that were rewritten. Use for "weekly review", "how did this week go", or on a Friday Routine.
---

# Weekly review

Two jobs: tell Adrian what happened, and stop the knowledge files from rotting.
The second one is why this skill exists — a chief of staff that never updates
what it knows degrades into a mail sorter within a month.

## Part 1 — The week

Read this week's `state/triage-log/` files. Report:

- Volume by tier, and the trend against last week
- P1s that sat more than a day before Adrian sent the draft
- Threads that went cold — drafted, never sent, never followed up
- What `state/pending-responses.md` is still carrying, oldest first

## Part 2 — Maintenance

This is the part that matters. Work through each:

### Unfiled senders
Everyone under "Unfiled" in `relationships.md` who appeared more than once this
week. Propose a full entry for each — relationship, register, priority floor —
and ask Adrian to confirm. Delete the ones that appeared once and never again.

### Archive candidates
Senders that hit Skip tier three or more times and are not yet in
`routing.md`'s safe-to-archive list. Propose them as a batch, with counts.

### Voice drift
The highest-signal thing available. Compare drafts you wrote against what Adrian
actually sent (pull sent mail for the week and diff against the log).

- Where he rewrote the **substance**, that is a `priorities.md` or
  `relationships.md` gap.
- Where he rewrote the **wording**, that is a `SOUL.md` gap — and the specific
  edit is the rule. Propose the amendment in his words, not yours.

### Stale priorities
If `priorities.md` "Last reviewed" is over 14 days old, walk Adrian through it —
what shipped, what's dead, what's new — and update the date.

## Part 3 — Commit

Write `state/weekly-review/YYYY-Www.md`, apply the knowledge-file changes Adrian
approved, and commit. Proposed-but-unapproved changes stay in the review file;
never edit `SOUL.md` on your own judgment.
