import { getClient, modelId, modelOptions } from './provider';
import { TOOL_DEFS, runTool } from './tools';
import { SYSTEM_PROMPT, dynamicContext } from './prompt';
import { CFG } from './config';
import { getJobs, effectiveStatus, todayIST } from '@/lib/careers';

// One visitor message: stream Claude's answer, running KMF tools as requested.
// history: Anthropic.MessageParam[] ending with the visitor's message.
// Returns a summary for logging/analytics; text is delivered through onText.
export async function runChat({ history, page, intent, model, signal, onText, onTool, onReset }) {
  const client = getClient();
  const m = model || CFG.model;
  const today = todayIST();
  const system = [
    // Tools + this block form the cached prefix (tools render before system).
    { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
    { type: 'text', text: dynamicContext({ page, intent, today, openJobs: getJobs().filter((j) => effectiveStatus(j, today) === 'open').length }) },
  ];
  const messages = [...history];
  const ctx = { lang: 'en' }; // English only for now: links go to /en pages

  const toolsUsed = [];
  const toolResults = [];
  const usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, calls: 0 };
  let text = '';
  let unanswered = null;
  let stop = null;

  for (let round = 0; round <= CFG.maxToolRounds; round++) {
    const lastRound = round === CFG.maxToolRounds;
    let roundText = '';

    const stream = client.messages.stream(
      {
        model: modelId(m),
        max_tokens: CFG.maxOutputTokens,
        system,
        tools: TOOL_DEFS,
        // After the tool budget is spent, force a text answer.
        ...(lastRound ? { tool_choice: { type: 'none' } } : {}),
        messages,
        ...modelOptions(m),
      },
      { signal }
    );

    stream.on('text', (delta) => {
      roundText += delta;
      onText?.(delta);
    });

    const msg = await stream.finalMessage();
    usage.calls += 1;
    usage.input += msg.usage?.input_tokens || 0;
    usage.output += msg.usage?.output_tokens || 0;
    usage.cacheRead += msg.usage?.cache_read_input_tokens || 0;
    usage.cacheWrite += msg.usage?.cache_creation_input_tokens || 0;
    stop = msg.stop_reason;

    const toolUses = msg.content.filter((b) => b.type === 'tool_use');
    // A refusal can cut a tool call off mid-input: never run that turn's tools.
    // max_tokens with a tool call means the input may be truncated: don't run it.
    if (stop === 'refusal' || stop !== 'tool_use' || !toolUses.length) {
      text += roundText;
      break;
    }
    // Text written before a tool call ("Let me check…") is not part of the answer.
    if (roundText) onReset?.();

    messages.push({ role: 'assistant', content: msg.content });
    const results = await Promise.all(
      toolUses.map(async (t) => {
        toolsUsed.push(t.name);
        onTool?.(t.name);
        if (t.name === 'flag_unanswered') unanswered = String(t.input?.topic || 'unknown').slice(0, 200);
        const r = await runTool(t.name, t.input, ctx);
        toolResults.push({ name: t.name, input: t.input, content: r.content.slice(0, 4000), isError: r.isError });
        return { type: 'tool_result', tool_use_id: t.id, content: r.content, ...(r.isError ? { is_error: true } : {}) };
      })
    );
    // All results of one round go back in a single user message.
    messages.push({ role: 'user', content: results });
  }

  return { text, toolsUsed, toolResults, unanswered, stop, usage, model: m };
}
