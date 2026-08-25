# routing.md — Sender rules and where work goes

## Safe to archive (Skip tier)

> The **only** senders the agent may archive. Everything not matched here stays
> in the inbox regardless of tier. Add patterns as you observe them; the triage
> log proposes candidates each run.

```
noreply@*
no-reply@*
notifications@github.com
*@substack.com          # newsletters — read in the reader, not the inbox
calendar-notification@google.com
*@e.usps.com
```

## Never auto-anything

> Senders that always get a human read, even if they look automated.

```
*@aidedmarketing.com
```
<!-- TODO: add client domains here -->

## Where tasks go

The agent creates tasks from commitments it finds. Route by type — putting
everything in one system is how a task system dies.

| Kind of thing | System | Rule |
|---|---|---|
| Personal / one-off todo, no project | **Todoist** | Default. Due date if the email implies one. |
| Client deliverable or project work | **Asana** | Must land in the project matching the client name. Never create a loose task. |
| Reference, notes, meeting output, anything with a body | **Notion** | Page, not task. Link it from the Todoist/Asana item. |
| Waiting on someone else | **`state/pending-responses.md`** | Not a task system. Tracked here so the agent can chase it. |

**Rule of thumb:** if it has a body of text, it is a Notion page with a Todoist
or Asana task pointing at it. If it is a single action, it is just a task.

## Chase intervals

How long before the agent flags an unanswered outbound thread in the brief.

| Tier of recipient | Chase after |
|---|---|
| Client (P1) | 2 business days |
| Prospect (P2) | 4 business days |
| Everyone else | 7 business days |
