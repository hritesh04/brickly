import { ChatOpenAI } from "@langchain/openai";

export async function connectoOpenAI() {
  return new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_KEY,
  });
}
