import { BricklyAgent } from "./brickly";
import { connectoOpenAI } from "./model/openai";
import { BricklyMCP } from "./tools/bricklyMcp";
import { PixelLabMCP } from "./tools/pixelLabMcp";
import dotenv from "dotenv";

dotenv.config();

async function createGraph() {
  const model = await connectoOpenAI();
  const bricklyMcp = new BricklyMCP();
  const pixellabMcp = new PixelLabMCP();

  const bricklyTools = await bricklyMcp.getTools();
  const designTools = await pixellabMcp.getTools();

  const agent = new BricklyAgent(model, { bricklyTools, designTools });

  return agent.agent?.graph;
}

export const graph = createGraph();
