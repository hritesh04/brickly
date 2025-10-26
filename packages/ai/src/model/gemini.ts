import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export function connectToGemini() {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_KEY,
  });
}
