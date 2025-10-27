import { MultiServerMCPClient } from "@langchain/mcp-adapters";

export class PixelLabMCP {
  private client: MultiServerMCPClient;
  constructor() {
    this.client = new MultiServerMCPClient({
      mcpServers: {
        pixellab: {
          transport: "http",
          url: "https://api.pixellab.ai/mcp",
          headers: {
            Authorization: "Bearer " + process.env.PIXELLAB_KEY,
          },
        },
      },
      beforeToolCall: ({ serverName, args, name }) => {
        console.log("calling tool ", serverName, name, " with args ", args);
        return {
          ...(args as Record<string, unknown>),
        };
      },
    });
  }
  async getTools() {
    return this.client.getTools();
  }
}
