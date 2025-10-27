import {
  CreateNode,
  createNodeWithChildrenSchema,
  getSceneHierarchy,
  nodeWithRelations,
  UpdateNode,
  updateNodeSchema,
} from "@brickly/db";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import z from "zod";

export function registerNodeTools(server: McpServer) {
  server.registerTool(
    "create_node",
    {
      description: "creates node or scene based on children passed",
      inputSchema: createNodeWithChildrenSchema.shape,
      outputSchema: nodeWithRelations.shape,
    },
    async (data, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[NODE] UserID not found");
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

        const result = await CreateNode(data);
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        console.log("[NODE] Error creating node : ", error);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to create node",
            },
          ],
        };
      }
    }
  );
  server.registerTool(
    "update_node",
    {
      description: "update a node",
      inputSchema: updateNodeSchema.shape,
      outputSchema: nodeWithRelations.shape,
    },
    async (data, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[NODE] UserID not found");
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
        const result = await UpdateNode(data);
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to update node",
            },
          ],
        };
      }
    }
  );
  server.registerTool(
    "node_hierarchy",
    {
      description: "get node and all its childrens detail",
      inputSchema: { id: z.number().describe("id of the node") },
      outputSchema: nodeWithRelations.shape,
    },
    async (data, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[NODE] UserID not found");
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
        const result = await getSceneHierarchy(data.id);
        return {
          structuredContent: { result },
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to update node",
            },
          ],
        };
      }
    }
  );
}
