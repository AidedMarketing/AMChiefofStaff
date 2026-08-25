---
name: calendar-guard
description: Check Google Calendar for conflicts, missing prep time, back-to-back stacking, and travel gaps; answer availability questions raised by Meeting-tier email. Use for "what's my day look like", "am I free", scheduling replies, or as stage 3 of the morning brief.
---

# Calendar guard

Timezone is **America/New_York** unless an event says otherwise. Convert
everything before comparing. Most scheduling mistakes are timezone mistakes.

## Answering availability (called by email-triage)

When email-triage hands you a Meeting-tier thread:

1. Read the actual calendar for the proposed window. Do not infer from memory.
2. A slot is free only if it is free **and** has the buffer below.
3. Return one of exactly three answers — free, conflicted (with what), or
   free-but-tight (with why). Never "should be fine".

## Buffers

These are what make the difference between a calendar that works and one that
technically has gaps in it.

| Situation | Required buffer |
|---|---|
| Between any two video calls | 10 min |
| Before a first-time client or prospect call | 30 min prep |
| Around anything requiring travel | travel time + 20 min |
| After a call longer than 60 min | 15 min |

A slot that violates a buffer is **free-but-tight**, not free.

## Daily scan (stage 3 of the morning brief)

Look at today and the next two business days. Report only what is wrong or
needs action:

- **Conflicts** — genuine double-bookings, with both events named.
- **Unprepped** — a client or prospect meeting with no prep block before it, and
  no Notion page or agenda attached.
- **Stacked** — three or more consecutive calls with no gap.
- **Orphaned** — a meeting with no agenda, no description, and no other
  attendees who have accepted.
- **Protected time under threat** — anything in `knowledge/priorities.md` under
  Standing commitments that has been overwritten.

If none of these are true, say "calendar is clean" and nothing else. Do not
recite the schedule back — Adrian can see his own calendar.

## What you may and may not do

- **May:** propose times, draft scheduling replies (via email-triage), create
  prep blocks on Adrian's own calendar.
- **May not:** accept, decline, move, or cancel any invitation involving another
  person. Those go in the brief as recommendations.
