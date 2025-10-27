import { LanguageModelLike } from "@langchain/core/language_models/base";
import { createAgent, createMiddleware, ReactAgent } from "langchain";
import { Tool } from "../tools/type";
import { logger } from "../utils/logger";

export function initAgent(
  model: LanguageModelLike,
  prompt: string,
  tools?: Tool
): ReactAgent {
  return createAgent({
    model,
    tools,
    systemPrompt: prompt.trim(),
    middleware: [toolMonitoringMiddleware],
  });
}

const toolMonitoringMiddleware = createMiddleware({
  name: "ToolMonitoringMiddleware",
  beforeModel: (state) => {
    const agentName = (state as any).configurable?.agentName || "Agent";
    logger.modelCall(agentName, state.messages.length);

    logger.debug(`Messages being sent to model:`, {
      messageCount: state.messages.length,
      messages: state.messages.map((msg, idx) => ({
        index: idx,
        role: msg.type || "unknown",
        contentPreview:
          typeof msg.content === "string"
            ? msg.content.substring(0, 200)
            : JSON.stringify(msg.content).substring(0, 200),
      })),
    });

    return;
  },
  afterModel: (state) => {
    const agentName = (state as any).configurable?.agentName || "Agent";
    const lastMessage = state.messages[state.messages.length - 1];

    const contentStr =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : JSON.stringify(lastMessage.content);

    logger.modelResponse(agentName, contentStr);

    logger.debug(`Full model response:`, {
      role: lastMessage.type || "unknown",
      content: lastMessage.content,
      toolCalls: (lastMessage as any).tool_calls?.length || 0,
    });

    return;
  },
  wrapToolCall: async (request, handler) => {
    const startTime = Date.now();

    logger.toolCall(request.toolCall.name, request.toolCall.args);

    try {
      const result = await handler(request);
      const duration = Date.now() - startTime;

      logger.toolSuccess(request.toolCall.name, result);
      logger.debug(`Tool execution time: ${duration}ms`);

      return result;
    } catch (e) {
      const duration = Date.now() - startTime;

      logger.toolError(request.toolCall.name, e);
      logger.debug(`Tool failed after ${duration}ms`);

      throw e;
    }
  },
});
