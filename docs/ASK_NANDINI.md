# Ask Nandini — KMF website assistant

An AI chat assistant on www.kmfnandini.coop that answers visitor questions about KMF and Nandini **only from KMF's own data** (live Strapi content, the Careers data file, site pages and notification PDFs), with links to the right page.

**Status:** built on branch `feat/ask-nandini`, not deployed. **English only for now** (decision 2026-09-29). Visitors may write in any language; replies are in English with a short note. The admin page records which languages people write in, to decide when to add Kannada.

---

## How it works

```
Browser                          Next.js server (Vercel)                 External
───────                          ───────────────────────                 ────────
Launcher (bottom-left, tiny)
  └─ click → chat panel (lazy)
       POST /api/ask-nandini ──▶ route.js: validate, rate limit ───────▶ Supabase (Mumbai): limits, logs
       ◀── streamed NDJSON ────   chat.js: Claude + tool loop ─────────▶ Claude (Anthropic API or Bedrock)
                                   tools.js: read-only KMF data ───────▶ Strapi public API (GET only)
                                   search.js: BM25 over chat-index.json
```

| Piece | File |
|---|---|
| API route (streaming, limits, fallback, logging) | `src/app/api/ask-nandini/route.js` |
| Feedback endpoint | `src/app/api/ask-nandini/feedback/route.js` |
| Claude tool loop | `src/lib/ask-nandini/chat.js` |
| Rules / system prompt | `src/lib/ask-nandini/prompt.js` |
| Tools (products, notices, careers, milk unions, contact, site search, flag_unanswered) | `src/lib/ask-nandini/tools.js` |
| Site search (keyword/BM25) | `src/lib/ask-nandini/search.js` + `src/data/chat-index.json` |
| Provider switch (Anthropic / Bedrock) | `src/lib/ask-nandini/provider.js` |
| Settings and limits | `src/lib/ask-nandini/config.js` |
| Rate limits / daily cap | `src/lib/ask-nandini/store.js` |
| Question log, admin data | `src/lib/ask-nandini/log.js`, `src/lib/ask-nandini/supabase.js` |
| PII scrubbing, language detection | `src/lib/ask-nandini/text.js` |
| Chat UI (auto-open widget, mobile greeting, minimised bubble) | `src/components/ask-nandini/*` |
| Chat text, welcome message, suggested questions | `src/configtext/askNandini.js` |
| Admin page | `src/app/admin/ask-nandini/page.js` |
| Click counts for the admin page (credit, popup) | `src/lib/site-events.js`, `src/app/api/site-event/route.js` |
| Supabase setup SQL | `docs/ask-nandini-supabase.sql` |

### Safety rules (enforced in the system prompt)

- Facts only from tool results; never invents prices, vacancies, dates, eligibility, tender details, phone numbers or links. **Prices are not in the CMS**, so price questions get "not published; ask a Nandini parlour or call 1800 425 8030".
- Jobs: always checks the Careers data; never confirms a job that isn't listed; always adds the fake-recruitment warning; payment/offer stories are treated as likely fraud (cybercrime.gov.in / 1930). The current number of open notices is also given to the model on every request.
- Off-topic, political or abusive messages get a polite refusal. User text and tool results can't change the rules (prompt-injection resistant; tested).
- Privacy: never asks for personal details; logs are PII-scrubbed; one-line notice in the chat.

---

## Environment variables

Server-only variables are never sent to browsers (no `NEXT_PUBLIC_` prefix).

| Variable | Needed | Example / default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_ASK_NANDINI` | yes | `on` | **Kill switch.** Anything else = no launcher, no chat code loaded, API returns 404. Needs a redeploy. |
| `ANTHROPIC_API_KEY` | yes (Anthropic) | `sk-ant-…` | Claude API key. Use a key scoped to a dedicated workspace with a spend limit. |
| `ANTHROPIC_WORKSPACE_ID` | only for org-level keys | `wrkspc_…` | Required if the key isn't scoped to a workspace. |
| `ASK_NANDINI_PROVIDER` | no | `anthropic` | `bedrock` to use Claude in Amazon Bedrock. |
| `ASK_NANDINI_MODEL` | no | `claude-haiku-4-5` | Model ID (on Bedrock the `anthropic.` prefix is added). `claude-sonnet-5` is the tested alternative. |
| `ASK_NANDINI_AWS_REGION` | Bedrock only | `ap-south-1` | Plus AWS credentials (`AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` or a role). |
| `ASK_NANDINI_DAILY_MSG_CAP` | recommended | `3000` | Hard daily limit on messages across all visitors; after it, visitors see contact options. |
| `ASK_NANDINI_TIMEOUT_MS` | no | `25000` | Per-message timeout before the fallback message. |
| `SUPABASE_URL` | production | `https://xxxx.supabase.co` | Logs, shared rate limits. Without it: in-memory (dev only). |
| `SUPABASE_SERVICE_ROLE_KEY` | production | secret | Server-side Supabase key. |
| `ASK_NANDINI_HASH_SALT` | recommended | random string | Salt for hashing visitor IPs (rate limiting). |
| `ASK_NANDINI_ADMIN_USER` / `ASK_NANDINI_ADMIN_PASSWORD` | for admin page | strong password | Basic auth for `/admin/ask-nandini`. Unset = admin page is a 404. |
| `ASK_NANDINI_EVAL_TOKEN` | **never in production** | random string | Lets the eval script bypass limits and pick a model. |

Fixed limits (in `config.js`): 1,000 characters per message, last 8 turns sent, 1,024 output tokens per call, 4 tool rounds per message, 20 messages / 10 min and 200 / day per visitor.

---

## Provider switch and data residency (important for government clients)

Checked 2026-09-29 against [AWS's regional availability table](https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html), [Anthropic's Bedrock guide](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock) and [AWS's India announcement (Mar 2026)](https://aws.amazon.com/blogs/machine-learning/access-anthropic-claude-models-in-india-on-amazon-bedrock-with-global-cross-region-inference):

- In **ap-south-1 (Mumbai)** and **ap-south-2 (Hyderabad)**, Claude on Bedrock is offered through the **Global endpoint only**: requests may be processed in any AWS commercial region; CloudWatch/CloudTrail logs stay in the source region. There is **no in-region or India-only option** for Claude Haiku 4.5 or Sonnet 5 (Opus 5 has a multi-country "Geo" option in Mumbai).
- So **switching to Bedrock does not give India data residency for the model call** today. It does give AWS billing, IAM, and Bedrock's data-handling terms.
- What *is* kept in India: the question logs (Supabase project in Mumbai).
- Model IDs on Bedrock: `anthropic.claude-haiku-4-5`, `anthropic.claude-sonnet-5` (client: `AnthropicBedrockMantle` from `@anthropic-ai/bedrock-sdk`).

To switch: set `ASK_NANDINI_PROVIDER=bedrock`, `ASK_NANDINI_AWS_REGION=ap-south-1`, AWS credentials with Bedrock access to the model, and redeploy. Run the eval against a preview first.

---

## Cost

Prices (checked 2026-09-29): [Claude API](https://platform.claude.com/docs/en/about-claude/pricing) Haiku 4.5 $1 input / $5 output / $0.10 cache read per million tokens; Sonnet 5 $2 / $10 / $0.20. Bedrock global endpoint: same as the Claude API for Haiku 4.5; regional endpoints +10% (not available in Mumbai). [Supabase](https://supabase.com/pricing): Free plan 500 MB database (pauses after 1 week without activity); Pro $25/month (8 GB).

**Measured** (44-question eval, Haiku 4.5, prompt cache warm): **$0.0030 per message**, 1.8 model calls per message, first text in ~2 s, full answer ~3.5 s. Sonnet 5 measured $0.0079 per message.

Assumptions for the table: 3 messages per chat, multi-turn history adding ~30% (≈ $0.004/message), plus cold-cache writes at low traffic (the 5-minute prompt cache expires between chats).

| Chats per day | Messages / month | Haiku 4.5 (default) | Sonnet 5 (for comparison) | Supabase |
|---|---|---|---|---|
| 50 | ~4,500 | **≈ $20–27 / month** | ≈ $45–60 | Free (~25 MB/90 days) |
| 200 | ~18,000 | **≈ $55–75 / month** | ≈ $140–180 | Free (~140 MB/90 days) |
| 1,000 | ~90,000 | **≈ $270–360 / month** | ≈ $700–900 | Pro $25 (logs exceed 500 MB) |

**Hard ceiling:** with the default daily cap of 3,000 messages, model spend can't exceed roughly **$12/day (~$360/month)** on Haiku, whatever the traffic. The admin page shows the actual estimated spend from logged token counts. Set a matching spend limit on the Anthropic workspace as a second guard.

---

## Search index: re-indexing when content changes

`search_site` searches `src/data/chat-index.json` (483 chunks, 0.25 MB on 2026-09-29), built from:
1. every English page in the sitemap (repeated header/footer text removed),
2. 36 Strapi collections (company profile, schemes, animal husbandry, milestones, executives, directors, news, units, milk unions, recipes, tenders …),
3. text of attached tender PDFs.

Products, tenders, news, careers and milk unions are **also** read live by their own tools (5-minute cache), so those are always current without re-indexing. Re-index when page text, schemes or PDFs change:

```bash
npm run build && npm start          # in one terminal (or use the live site URL)
node scripts/build-chat-index.mjs http://localhost:3000
git add src/data/chat-index.json && git commit -m "chat index refresh" && redeploy
```

The script prints scanned PDFs (no text layer; not searchable until OCR'd) and Word attachments (not indexed). On 2026-09-29: 11 of 52 tender notices had any file attached; 2 PDFs were scanned images; 4 attachments were Word files. If the index grows past ~5 MB, move it to Supabase (full-text or pgvector).

**Next release:** a Vercel Cron job can rebuild the index nightly (needs the index stored in Supabase instead of the repo, since a deployed function can't commit to Git).

---

## Admin page

`/admin/ask-nandini` (username/password from the env vars above). Periods: 7 / 30 / 90 days.

- **Unanswered questions** — the assistant had no data (it calls `flag_unanswered`). This is the list of content KMF should add to the website. Note: the model occasionally answers "not published" without flagging, so this list slightly under-counts; the 👎 list catches some of the rest.
- **Top questions** — what visitors ask most.
- **Languages visitors wrote in** — demand for Kannada and other languages.
- **Answers marked 👎** — with the answer text, to spot wrong or unhelpful replies.
- **Velozity credit clicks** — site footer vs chatbot "Powered by", and total.
- **"What brings you here today?" choices** — how many visitors picked each option, and how many closed it without choosing.
- Totals: answered rate, limits hit, errors, estimated model cost, tokens.

Click counts come from `POST /api/site-event` (only known events/options are accepted), stored in the `site_events` table: each visitor counted once per option per day, using a salted hash of IP + date that changes daily (visitors can't be followed across days). Kept 90 days. The same clicks also go to GA4 (`credit_click`, `intent_selected`, `intent_dismissed`).

Logs are PII-scrubbed (phones, emails, Aadhaar, PAN, long numbers) and deleted after 90 days. No IP addresses or visitor IDs are stored.

---

## Supabase setup (once)

**Done on 2026-09-30:** project `kmf-ask-nandini` (ref `wzerqudadltebiicceks`) in the Velozity organisation, region ap-south-1 (Mumbai), URL `https://wzerqudadltebiicceks.supabase.co`. `docs/ask-nandini-supabase.sql` has been run; RLS verified (anon key reads nothing and can't call the functions); test data removed. The steps below are for recreating it.

1. supabase.com → New project → region **South Asia (Mumbai)**.
2. SQL editor → paste and run `docs/ask-nandini-supabase.sql`.
3. Project settings → API → copy the Project URL (`SUPABASE_URL`) and the **service_role** key (`SUPABASE_SERVICE_ROLE_KEY`) into Vercel env vars (server-side, never `NEXT_PUBLIC_`).
4. Optional: enable pg_cron and schedule `ask_nandini_cleanup()` daily (the app also runs it occasionally).

---

## Evaluation

```bash
npm run build && npm start      # with NEXT_PUBLIC_ASK_NANDINI=on and ASK_NANDINI_EVAL_TOKEN set
node scripts/eval-ask-nandini.mjs http://localhost:3000 [--models=claude-haiku-4-5,claude-sonnet-5] [--judge] [--only=12,13]
```

44 English cases (products, prices, tenders, jobs and fraud, complaints, milk unions, farmers, unanswerable questions, 3 non-English questions that must get English replies, off-topic, prompt injection, abuse). Automatic checks: English reply, tools used, links present and valid, no invented phone numbers or prices, fraud warning, refusals. `--judge` adds a Claude Opus 5 grader for grounding (extra cost, ~$1–2 per run). Each run costs real money (~$0.15 on Haiku without the judge). Results: `.eval/*.json` (git-ignored).

Latest result (2026-09-29, Haiku 4.5, with the index): **43/44** — the remaining case is a Hindi job question answered safely in English but without calling the careers tool first.

---

## Stored replies (common questions answered without Claude)

Added 2026-10-01 after the first day's log showed ~35% of questions were the same few (mostly the suggestion buttons: "Any current vacancies?" 39×, "Where can I buy Nandini products?" 22×, "Nandini ghee prices?" 20× …).

- File: `src/configtext/askNandiniReplies.js` (edit the wording there); logic: `src/lib/ask-nandini/stored.js`.
- Used only when the visitor's **first** message matches a listed question exactly (ignoring capitals, spaces and ?!. at the end). Follow-ups ("yes", "that one") and anything worded differently still go to Claude.
- **Fixed replies:** prices, where to buy, bulk order, parlour/dealership, complaints, customer care, "is this job offer real?", greetings.
- **Live replies** built from current KMF data (so they never go stale): vacancies and how to apply (Careers data), latest tenders (CMS, open first), milk unions and Mysuru union (CMS), product categories and milk types (CMS). If the data source is down, Claude answers instead.
- Logged with model `stored` and $0 cost; the admin page shows the share answered from stored replies; GA4 gets `chat_tool_used` with `tool=stored_reply`.
- The eval script always uses Claude (stored replies are skipped in eval mode).

## Chat widget behaviour

- **Opens by itself** about 2 seconds after the page has loaded (loaded when the browser is idle, so it doesn't slow the page or move its layout). It does not take keyboard focus when it opens.
- **1-second intro** in the middle of the screen ("Ask Nandini · AI assistant · Powered by Velozity Global Solutions") the first time the chat appears in a visit and whenever it is opened from the minimised bubble. It never blocks clicks.
- **Position:** chat on the **bottom right**; the WhatsApp and toll-free call buttons are on the **bottom left**.
- **Desktop:** a 370 px chat card (below the site menu), with a blinking "Online" indicator and a short glow when it first appears.
- **Mobile:** a small greeting dialog with two suggested questions; tapping it or the input opens the full-screen chat.
- **Minimise** (chevron or Esc) leaves a pulsing bubble with an AI sparkle icon; the chat stays minimised for the rest of the visit (per browser tab).
- Footer: "Powered by **Velozity Global Solutions**" linking to the KMF case study, same link as the site footer: `https://www.velozityglobal.com/case-studies/kmf-nandini/?utm_source=kmfnandini&utm_medium=referral&utm_campaign=footer_credit`. Footer vs chatbot clicks are still counted separately on the admin page and in GA4 (`credit_click` → `location`).
- The intent popup ("What brings you here today?") can still appear over the idle chat card, but never while the visitor is chatting.
- GA4 `chat_open` has `trigger=auto` for the automatic opening and `trigger=user` when the visitor opens it, so real engagement can be told apart from impressions.
- Text, suggested questions and the credit link: `src/configtext/askNandini.js`.

## Voice input

Mic button uses the browser's Web Speech API (`en-IN`), shown only where supported (Chrome/Edge/Safari; not Firefox). Speech is processed by the browser vendor's service, not by KMF. `src/components/ask-nandini/voice.js` exposes `createVoiceInput()`; a provider such as Sarvam AI (better Indian-language speech) can be plugged in there later.

---

## Turning it off

Set `NEXT_PUBLIC_ASK_NANDINI=off` in Vercel and redeploy (or Instant Rollback to a deployment without it). The launcher disappears, no chat code is downloaded, and `/api/ask-nandini` returns 404.
