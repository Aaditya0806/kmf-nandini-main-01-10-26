import Anthropic from '@anthropic-ai/sdk';
import { AnthropicBedrockMantle } from '@anthropic-ai/bedrock-sdk';
import { CFG } from './config';

// One client per server instance. Keys come from the environment only:
// ANTHROPIC_API_KEY for the Claude API; the standard AWS credential chain
// (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY or a role) for Bedrock.
let client = null;

export function getClient() {
  if (client) return client;
  // Org-level API keys (not scoped to a workspace) must name the workspace.
  const workspace = process.env.ANTHROPIC_WORKSPACE_ID;
  client =
    CFG.provider === 'bedrock'
      ? new AnthropicBedrockMantle({ awsRegion: CFG.awsRegion, maxRetries: 1 })
      : new Anthropic({
          maxRetries: 1,
          ...(workspace ? { defaultHeaders: { 'anthropic-workspace-id': workspace } } : {}),
        });
  return client;
}

// "claude-haiku-4-5" -> "anthropic.claude-haiku-4-5" on Bedrock.
export function modelId(model = CFG.model) {
  if (CFG.provider === 'bedrock' && !model.startsWith('anthropic.')) return `anthropic.${model}`;
  return model;
}

// Per-model request options. Haiku 4.5 has no adaptive thinking or effort;
// newer models think adaptively by default, kept at low effort for chat latency.
export function modelOptions(model) {
  if (/haiku-4-5/.test(model)) return {};
  if (process.env.ASK_NANDINI_THINKING === 'off') return { thinking: { type: 'disabled' } };
  return { output_config: { effort: 'low' } };
}

export { Anthropic };
