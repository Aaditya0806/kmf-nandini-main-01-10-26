// Ask Nandini: server-side settings. Read only on the server (API route);
// nothing here is shipped to the browser except the NEXT_PUBLIC_ flag.

const int = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : d;
};

export const CFG = {
  enabled: process.env.NEXT_PUBLIC_ASK_NANDINI === 'on',

  // 'anthropic' (Claude API) or 'bedrock' (Claude in Amazon Bedrock).
  provider: (process.env.ASK_NANDINI_PROVIDER || 'anthropic').toLowerCase(),
  // Claude API model ID; on Bedrock the "anthropic." prefix is added automatically.
  model: process.env.ASK_NANDINI_MODEL || 'claude-haiku-4-5',
  // Bedrock region. ap-south-1 (Mumbai) serves Claude via the Global endpoint only.
  awsRegion: process.env.ASK_NANDINI_AWS_REGION || process.env.AWS_REGION || 'ap-south-1',

  maxInputChars: 1000, // per visitor message
  maxHistoryMessages: 16, // last 8 turns (user + assistant)
  maxOutputTokens: 1024, // per model call
  maxToolRounds: 4, // tool calls per visitor message before a forced answer
  timeoutMs: int(process.env.ASK_NANDINI_TIMEOUT_MS, 25000),

  // Spend guards
  dailyMsgCap: int(process.env.ASK_NANDINI_DAILY_MSG_CAP, 3000), // all visitors, per IST day
  ratePerWindow: 20, // per IP per 10 minutes
  rateWindowMin: 10,
  ratePerDay: 200, // per IP per day

  // Lets scripts/eval-ask-nandini.mjs bypass rate limits, pick a model and see
  // tool results. Leave unset in production.
  evalToken: process.env.ASK_NANDINI_EVAL_TOKEN || '',
};

export const ALLOWED_EVAL_MODELS = ['claude-haiku-4-5', 'claude-sonnet-5'];

// USD per million tokens (Claude API list prices, checked 2026-09-29) for the
// admin page's spend estimate. Bedrock prices differ slightly; see docs.
export const PRICES = {
  'claude-haiku-4-5': { in: 1, out: 5, cacheRead: 0.1, cacheWrite: 1.25 },
  'claude-sonnet-5': { in: 2, out: 10, cacheRead: 0.2, cacheWrite: 2.5 },
};

export function costUSD(usage, model) {
  const p = PRICES[String(model || '').replace(/^anthropic\./, '')];
  if (!usage || !p) return null;
  return (usage.input * p.in + usage.output * p.out + usage.cacheRead * p.cacheRead + usage.cacheWrite * p.cacheWrite) / 1e6;
}
