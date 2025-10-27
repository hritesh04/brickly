import { project } from "@brickly/db";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import z from "zod";

export function registerProjectTool(server: McpServer) {
  server.registerTool(
    "create_project",
    {
      description: "create a new project",
      inputSchema: project.createProjectSchema.omit({ userID: true }).shape,
      outputSchema: project.projectSchema.shape,
    },
    async (data, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[PROJECT] UserID not found");
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

        const result = await project.createProject({
          ...data,
          userID: userId,
        });
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        console.log("[PROJECT] Error creating project : ", error);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to create project",
            },
          ],
        };
      }
    }
  );
  server.registerTool(
    "get_project_details",
    {
      description: "returns project details based on id",
      inputSchema: {
        id: z.number().describe("id of the Project (e.g. 5)"),
      },
      outputSchema: project.projectSchema.shape,
    },
    async ({ id }, extra) => {
      try {
        const userId = Number(extra.requestInfo?.headers["userID"] as string);
        if (!userId) {
          console.log("[PROJECT] UserID not found");
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
        const result = await project.getProjectByID(id, userId);
        if (!result)
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "project details not found",
              },
            ],
          };
        return {
          structuredContent: result,
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to find project details",
            },
          ],
        };
      }
    }
  );
}
