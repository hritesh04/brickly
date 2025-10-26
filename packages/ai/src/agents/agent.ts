import { LanguageModelLike } from "@langchain/core/language_models/base";
import { createAgent, ReactAgent } from "langchain";
import { Tool } from "../tools/type";

export function initAgent(
  model: LanguageModelLike,
  prompt: string,
  tools?: Tool
): ReactAgent {
  return createAgent({
    model,
    tools,
    systemPrompt: prompt.trim(),
  });
}
