import { resource } from "@brickly/db";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export function registerResourceTools(server: McpServer) {
  server.registerTool(
    "create_resource",
    {
      description: "add ext_resource or sub_resource to a node or project",
      inputSchema: resource.createResourceSchema.shape,
      outputSchema: resource.resourceSchema.shape,
    },
    async (data, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[RESOURCE] UserID not found");
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "authentication error",
              },
            ],
          };
        }

        const result = await resource.createResource(data);
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        console.log("[RESOURCE] Error creating resource : ", error);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to create resource",
            },
          ],
        };
      }
    }
  );

  server.registerTool(
    "update_resource",
    {
      description:
        "update ext_resource or sub_resource that belongs to a node or project",
      inputSchema: resource.resourceSchema.shape,
      outputSchema: resource.resourceSchema.shape,
    },
    async (data, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[RESOURCE] UserID not found");
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "authentication error",
              },
            ],
          };
        }

        const result = await resource.updateResource(data);
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        console.log("[RESOURCE] Error updating resource : ", error);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to update resource",
            },
          ],
        };
      }
    }
  );
}
