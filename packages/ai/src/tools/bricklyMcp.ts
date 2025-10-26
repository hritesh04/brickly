import { MultiServerMCPClient } from "@langchain/mcp-adapters";

export class BricklyMCP {
  private client: MultiServerMCPClient;
  constructor() {
    this.client = new MultiServerMCPClient({
      mcpServers: {
        brickly: {
          transport: "http",
          url: process.env.MCP_URL || "http://localhost:4000/mcp",
        },
      },
      beforeToolCall: ({ serverName, args, name }, _, opts) => {
        return {
          ...(args as Record<string, unknown>),
          headers: {
            "BRICKLY-SESSION": opts.configurable?.session,
          },
        };
      },
    });
  }
  async getTools() {
    return this.client.getTools();
  }
}
