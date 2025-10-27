import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { registerProjectTool } from "./project/index.js";
import { registerNodeTools } from "./node/index.js";
import { registerResourceTools } from "./resource/index.js";
import { CheckAPIKey } from "@brickly/db";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../../.env" });

const setupServer = () => {
  const server = new McpServer({
    name: "brickly",
    version: "1.0.0",
    capabilities: {
      tools: {},
    },
  });

  registerProjectTool(server);
  registerNodeTools(server);
  registerResourceTools(server);

  return server;
};

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function userAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const apiKey = req.header("X-API-KEY");
    const bearerToken = req.header("Authorization");

    if (!apiKey && !bearerToken) {
      console.warn("[AUTH] Missing authentication credentials");
      return sendAuthError(res, "Missing authentication credentials");
    }

    if (bearerToken) {
      try {
        const token = bearerToken.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.headers["userID"] = String(decoded.userId);
        console.log(
          `[AUTH] User ${decoded.userId} authenticated via Bearer token`
        );
        return next();
      } catch (err) {
        console.warn(
          "[AUTH] Invalid Bearer token:",
          err instanceof Error ? err.message : err
        );
        return sendAuthError(res, "Invalid or expired token");
      }
    }

    if (apiKey) {
      const data = await CheckAPIKey(apiKey);
      if (!data || !data.valid) {
        console.warn(
          `[AUTH] Invalid or expired API key: ${apiKey.substring(0, 8)}...`
        );
        return sendAuthError(res, data ? "Expired API key" : "Invalid API key");
      }
      req.headers["userID"] = String(data.userID);
      console.log(`[AUTH] User ${data.userID} authenticated via API key`);
      return next();
    }

    console.warn(`[AUTH] Missing authentication credentials from ${req.ip}`);
    return sendAuthError(res, "Missing authentication credentials");
  } catch (err) {
    console.error("[AUTH] Unexpected error in auth middleware:", err);
    return res.status(500).json({
      jsonrpc: "2.0",
      error: { code: -32603, message: "Internal server error" },
      id: null,
    });
  }
}

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const agentAuth = req.header("X-AGENT-AUTH");
    const agentSecret = process.env.AGENT_KEY || "brickly agent";
    console.log(agentAuth, agentSecret);
    if (agentAuth && agentSecret && agentAuth === agentSecret) {
      console.log("[AUTH] Standalone agent authenticated");
      return next();
    }

    return userAuth(req, res, next);
  } catch (err) {
    console.error("[AUTH] Unexpected error in agent auth middleware:", err);
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

app.post("/mcp", auth, async (req: Request, res: Response) => {
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
