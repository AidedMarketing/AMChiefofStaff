---
name: task-routing
description: Turn commitments found in email, calendar, and meeting notes into tasks in the right system - Todoist, Asana, or Notion - per the routing table. Use for "capture my todos", "what did I commit to", or as stage 4 of the morning brief.
---

# Task routing

Read `knowledge/routing.md` first. The routing table there is authoritative; this
skill only describes how to apply it.

## What counts as a commitment

A commitment is something **Adrian** said he would do, or that a thread now
obliges him to do. Look for:

- His own sent mail: "I'll send", "let me look at", "by Friday", "I'll get you"
- Inbound asks he has not declined
- Meeting outcomes with an owner that is him
- Deadlines mentioned anywhere in an Action-tier thread

Something *someone else* owes Adrian is **not** a task. It belongs in
`state/pending-responses.md`.

## Before creating anything — deduplicate

Search the destination system first. A duplicate task is worse than a missing
one, because it teaches Adrian to stop trusting the list. Match on intent, not
on exact title: "send the Q3 deck" and "get Q3 deck to Maria" are one task.

If a near-match exists, update its due date or add a comment instead of
creating.

## Creating

Per `knowledge/routing.md`:

- **Todoist** — personal and one-off. Title is a verb phrase. Due date only if
  the source implies one; never invent urgency.
- **Asana** — client work. **Must** go in the project matching the client name.
  If no such project exists, do not create a loose task — flag it in the brief
  and let Adrian make the project.
- **Notion** — anything with a body. Create the page, then link it from the task.

Every task body gets a link back to the source Gmail thread or calendar event.
A task you cannot trace back to why it exists gets deleted three weeks later.

## Reporting

List what you created and where, and — separately and more prominently —
anything you *declined* to create and why. The declines are the useful part:
they are where Adrian's systems don't match his actual work.
