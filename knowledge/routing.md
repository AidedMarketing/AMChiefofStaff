# routing.md — Sender rules and where work goes

## Scope — how far back a run reads

> Prevents a run from ever trying to pull the whole mailbox. This bounds
> every run, not just the first one.

- **Window:** since the most recent file in `state/triage-log/`; **48 hours**
  if there is no prior log (first run ever, or a long gap).
- **Hard cap:** if the window would still return an unreasonable number of
  threads (a stale label draining in, a long gap between runs), stop at
  **150 threads** and note the overflow in the log under Skip rather than
  processing all of it. The next run picks up where this one left off.
- **Classify before fetching bodies.** For a sender matching a known
  bot/newsletter/notification pattern, classify off the sender + subject
  alone — do not pull the full thread content just to confirm what the
  address already tells you. Keeps a run cheap even against a messy inbox.
- **The pre-launch backlog is out of scope, permanently, not just on the
  first run.** As of 2026-08-26 the inbox holds 25,000+ unread messages
  older than any lookback window this system will ever use — mostly Google
  Alerts and newsletters accumulated before this repo existed. Triage will
  never see it, by design, since it only ever looks inside the window above.
  That backlog needs a one-time manual cleanup, not automation:
  in Gmail, search `from:googlealerts-noreply@google.com` (or the sender in
  question), **"Select all conversations that match this search,"** then
  Archive. That clears thousands of messages in one action; doing the same
  thing through this system would mean one tool call per thread for no
  benefit.

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
googlealerts-noreply@google.com   # future alerts disabled 2026-08-26; any
                                   # stragglers inside the run window are safe
                                   # to archive. Does not apply to the
                                   # pre-existing backlog — see Scope above.
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
