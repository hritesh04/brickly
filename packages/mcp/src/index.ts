import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { project, CheckAPIKey } from "@brickly/db";
import dotenv from "dotenv";
import { IsomorphicHeaders } from "@modelcontextprotocol/sdk/types";

dotenv.config({ path: "../../.env" });

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const setupServer = () => {
  const server = new McpServer({
    name: "brickly",
    version: "1.0.0",
    capabilities: {
      tools: {},
    },
  });

  server.registerTool(
    "create_project",
    {
      description: "create a new project",
      inputSchema: {
        name: z.string().describe("name of the Project (e.g. My First Game)"),
        height: z.number().describe("viewport height of the game (e.g. 810)"),
        width: z.number().describe("viewport height of the game (e.g. 1440)"),
      },
      outputSchema: {
        id: z.number().describe("unique id of the project"),
        name: z.string().describe("name of the project"),
        icon: z.string().nullable().describe("icon for the game"),
        height: z.number().describe("viewport height of the game"),
        width: z.number().describe("viewport width of the game"),
        property: z
          .any()
          .nullable()
          .describe(
            "property of the game, equivalent to godot's project config"
          ),
        userID: z.number().describe("id of the user this project belongs to"),
      },
    },
    async ({ name, height, width }, extra) => {
      try {
        if (!extra.requestInfo)
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "request metadata not found",
              },
            ],
          };
        const userId = await getUserID(extra.requestInfo.headers);
        if (!userId) {
          console.log("UserID not found");
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
          name,
          height,
          width,
          userID: Number(userId),
        });
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        console.log("Error creating project : ", error);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "failed to create project userID not found",
            },
          ],
        };
      }
    }
  );

  return server;
};

const app = express();
app.use(express.json());

export async function getUserID(header: IsomorphicHeaders) {
  try {
    const apiKey = header["x-api-key"] as string;
    const session = header["brickly-session"] as string;
    console.log(apiKey, session);
    if (!apiKey && !session) {
      console.log("neither apikey nor session found");
      return null;
    }

    if (apiKey) {
      const data = await CheckAPIKey(apiKey);

      if (!data) {
        console.log("invalid API key");
        return null;
      }
      if (!data.valid) {
        console.log("expired API key");
        return null;
      }
      return data.userID;
    }

    if (session) {
      try {
        const decoded = jwt.verify(session, JWT_SECRET) as { userId: number };
        return decoded.userId;
      } catch (err) {
        console.error("Invalid or expired session token:", err);
        return null;
      }
    }
  } catch (err) {
    console.error("Unexpected error in auth middleware:", err);
    return null;
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const apiKey = req.header("X-API-KEY");
    const session = req.header("BRICKLY-SESSION");
    if (!apiKey && !session) {
      return sendAuthError(res, "Missing authentication credentials");
    }

    if (apiKey) {
      const data = await CheckAPIKey(apiKey);

      if (!data) {
        console.log("invalid API key");
        return sendAuthError(res, "Invalid API key");
      }
      if (!data.valid) {
        console.log("expired API key");
        return sendAuthError(res, "Expired API key");
      }
      req.headers["userID"] = String(data.userID);
      return next();
    }

    if (session) {
      try {
        const decoded = jwt.verify(session, JWT_SECRET) as { userId: number };
        req.headers["userID"] = String(decoded.userId);
        return next();
      } catch (err) {
        console.error("Invalid or expired session token:", err);
        return sendAuthError(res, "Invalid session token");
      }
    }
  } catch (err) {
    console.error("Unexpected error in auth middleware:", err);
    return res.status(500).json({
      jsonrpc: "2.0",
      error: { code: -32603, message: "Internal server error" },
      id: null,
    });
  }
}

function sendAuthError(res: Response, message: string) {
  if (!res.headersSent) {
    res.status(401).json({
      jsonrpc: "2.0",
      error: {
        code: -32601,
        message,
      },
      id: null,
    });
  }
}
const server = setupServer();

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
  enableJsonResponse: true,
});

app.post("/mcp", async (req: Request, res: Response) => {
  try {
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.get("/mcp", async (req, res) => {
  console.log("Received GET MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

const PORT = process.env.MCP_PORT || 3002;

(async function () {
  try {
    await server.connect(transport);
    app.listen(PORT, () => {
      console.log(`MCP Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
