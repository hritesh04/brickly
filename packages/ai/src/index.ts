import express from "express";
import { BricklyMCP } from "./tools/bricklyMcp";
import { BricklyAgent } from "./brickly";
import cors from "cors";
import dotenv from "dotenv";
import { PixelLabMCP } from "./tools/pixelLabMcp";
import { connectoOpenAI } from "./model/openai";
import { logger } from "./utils/logger";
dotenv.config();

let agent: BricklyAgent;

async function setupAgent() {
  try {
    logger.info("Initializing Brickly Agent...");

    const model = await connectoOpenAI();
    logger.info("Model connected successfully");

    const bricklyMcp = new BricklyMCP();
    const pixellabMcp = new PixelLabMCP();

    const bricklyTools = await bricklyMcp.getTools();
    const designTools = await pixellabMcp.getTools();

    logger.info(
      "Brickly MCP Tools loaded",
      bricklyTools.map((t) => t.name)
    );
    logger.info(
      "PixelLab MCP Tools loaded",
      designTools.map((t) => t.name)
    );

    agent = new BricklyAgent(model, { bricklyTools, designTools });
    logger.info("Brickly Agent initialized successfully");
  } catch (err) {
    logger.error("Failed to setup agent", err);
    throw err;
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const startTime = Date.now();
  const session = req.header("BRICKLY-SESSION");
  try {
    const { message } = req.body;

    if (!session) {
      res.status(401).json({
        success: false,
        error: "Unauthorized access session header missing",
      });
    }

    logger.httpRequest("POST", "/api/chat", session);

    if (!message) {
      logger.warn("Chat request missing message");
      return res
        .status(400)
        .json({ success: false, error: "Message is required" });
    }

    const result = await agent.invoke(message.content, session!);
    if (!result) {
      logger.error("Agent not available");
      return res.json({ error: "Agent not available" });
    }

    const duration = Date.now() - startTime;
    logger.httpResponse("POST", "/api/chat", 200, duration);
    res.json({
      success: true,
      response: result.messages[result.messages.length - 1].content,
      timestamp: new Date(),
      messages: result.messages.map((m: any) => {
        return {
          id: m.id || null,
          type: message.content ? "message" : "tool_call",
          role: m.type,
          content:
            m.content ||
            m?.additional_kwargs?.tool_calls?.map((k: any) => k.function),
          timestamp: new Date(),
        };
      }),
    });
  } catch (err) {
    const duration = Date.now() - startTime;
    logger.error(`Error processing chat request ${session}`, err);
    logger.httpResponse("POST", "/api/chat", 500, duration);
    res.status(500).json({ error: "Internal error" });
  }
});

app.post("/api/chat/stream", async (req, res) => {
  const startTime = Date.now();
  const session = req.header("BRICKLY-SESSION");
  try {
    const { message } = req.body;

    if (!session) {
      res.status(401).json({
        success: false,
        error: "Unauthorized access session header missing",
      });
    }

    logger.httpRequest("POST", "/api/chat/stream");

    if (!message) {
      logger.warn("Stream request missing message");
      return res.status(400).json({ error: "Message is required" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of agent.stream(message.content, session!)) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    res.end();

    const duration = Date.now() - startTime;
    logger.httpResponse("POST", "/api/chat/stream", 200, duration);
  } catch (err) {
    const duration = Date.now() - startTime;
    logger.error(
      `Error processing streaming request for session ${session}`,
      err
    );
    logger.httpResponse("POST", "/api/chat/stream", 500, duration);
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        content: "Internal error occurred",
      })}\n\n`
    );
    res.end();
  }
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    data: "Server Healthy",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.AGENT_PORT || 3003;

setupAgent()
  .then(() => {
    logger.info("Agent setup successful");
    app.listen(PORT, () => {
      logger.info(`Brickly Agent Server running on http://localhost:${PORT}`);
      logger.info("Ready to accept requests");
    });
  })
  .catch((err) => {
    logger.error("Failed to setup agent", err);
    process.exit(1);
  });
