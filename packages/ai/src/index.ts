import express from "express";
import { connectToGemini } from "./model/gemini";
import { BricklyMCP } from "./tools/bricklyMcp";
import { BricklyAgent } from "./brickly";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

let agent: BricklyAgent;

async function setupAgent() {
  try {
    const model = connectToGemini();
    const mcp = new BricklyMCP();
    const tools = await mcp.getTools();
    agent = new BricklyAgent(model, tools);
  } catch (err) {
    console.error("Failed to connect to Gemini model:", err);
    throw err;
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await agent.invoke(message, req.header("BRICKLY-SESSION")!);
    if (!result) return res.json({ error: "Agent not available" });

    res.json({
      response: result.messages[result.messages.length - 1].content,
      messages: result.messages.map((m: any) => ({
        role: m.role || m._getType?.(),
        content: m.content,
      })),
    });
  } catch (err) {
    console.error("Error processing chat request:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

app.post("/api/chat/stream", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    for await (const chunk of agent.stream(message)) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    res.end();
  } catch (err) {
    console.error("Error processing streaming request:", err);
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
    console.log("Agent setup successfull");
    app.listen(PORT, () => {
      console.log(
        `\nBrickly Agent Server running on http://localhost:${PORT}\n`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to setup agent:", err);
    process.exit(1);
  });
