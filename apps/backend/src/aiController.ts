import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { successResponse, failedResponse } from "./utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  projectContext?: {
    projectName?: string;
    sceneData?: any;
    nodes?: any[];
  };
}

export const aiChatHandler = async (req: Request, res: Response) => {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  try {
    const { messages, projectContext }: ChatRequest = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return failedResponse(400, new Error("Messages array is required"), res);
    }

    if (!process.env.GEMINI_API_KEY) {
      return failedResponse(
        500,
        new Error("Gemini API key not configured"),
        res
      );
    }

    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role !== "user") {
      return failedResponse(
        400,
        new Error("Last message must be from user"),
        res
      );
    }

    // Create system prompt for game development context
    const systemPrompt = `You are an AI assistant specialized in game development. You help developers with:
- Game design and mechanics
- Code implementation and debugging
- Asset management and optimization
- Performance optimization
- Best practices for game development
- Unity, Unreal Engine, and other game engines
- 2D and 3D game development
- Mobile and web game development

Be helpful, concise, and provide practical advice. If the user asks about specific game engines or frameworks, provide relevant examples and code snippets when appropriate.

Current project context: ${
      projectContext?.projectName
        ? `Project: ${projectContext.projectName}`
        : "No specific project context"
    }`;

    // Prepare conversation history for Gemini
    const conversationHistory = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: latestMessage.content }] },
    ];

    // Get Gemini model
    const chat = genAI.chats.create({
      // model: "gemini-1.5-flash",
      model: "gemini-2.5-flash",
      // history: conversationHistory.slice(0, -1)
    });

    // Start chat session
    // const chat = model.startChat({
    //   // All except the latest message
    // });

    // Send the latest message
    const result = await chat.sendMessage({ message: latestMessage.content });
    const response = await result.text;
    // const aiResponse = response.text();

    return successResponse(
      200,
      {
        message: {
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString(),
        },
      },
      res
    );
  } catch (error) {
    console.error("AI Chat Error:", error);
    return failedResponse(500, new Error("Failed to process AI request"), res);
  }
};
