import { useState, useCallback } from "react";

export type Message = {
  id: string | null;
  type: "message" | "tool_call";
  role: "human" | "ai" | "tool";
  content: string | Array<{ name: string; arguments: any }>;
  timestamp: Date;
};

interface UseAIReturn {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearMessages: () => void;
}

export default function useAI(): UseAIReturn {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      timestamp: new Date(),
      type: "message",
      role: "human",
      content:
        "create a project name yoyoyo with 400x300 dimensions, no visual needed",
    },
    {
      id: "2",
      timestamp: new Date(),
      type: "tool_call",
      role: "ai",
      content: [
        {
          name: "builder_agent",
          arguments:
            '{"request":"Create a new Godot project named \'yoyoyo\' with a main scene sized at 400x300 dimensions."}',
        },
      ],
    },
    {
      id: "3",
      timestamp: new Date(),
      type: "message",
      role: "tool",
      content:
        "The new Godot project named **'yoyoyo'** has been created with a main scene sized at **400x300** dimensions. If you need assistance with building the scene structure or adding specific nodes, let me know!",
    },
    {
      id: "4",
      timestamp: new Date(),
      type: "message",
      role: "ai",
      content:
        "The Godot project named **'yoyoyo'** has been successfully created with dimensions of **400x300**. If you need to add specific nodes, create features, or set up any game logic, just let me know!",
    },
    {
      id: "5",
      timestamp: new Date(),
      type: "message",
      role: "tool",
      content:
        "The new Godot project named **'yoyoyo'** has been created with a main scene sized at **400x300** dimensions. If you need assistance with building the scene structure or adding specific nodes, let me know!",
    },
    {
      id: "6",
      timestamp: new Date(),
      type: "message",
      role: "ai",
      content:
        "The Godot project named **'yoyoyo'** has been successfully created with dimensions of **400x300**. If you need to add specific nodes, create features, or set up any game logic, just let me know!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: null,
        role: "human",
        type: "message",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          process.env.AGENT_URL || "http://localhost:3003/api/chat/stream",
          {
            method: "POST",
            body: JSON.stringify({ message: userMessage }),
            headers: {
              "Content-Type": "application/json",
              "BRICKLY-SESSION":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTc2MTMyMzYzNSwiZXhwIjoxNzYxOTI4NDM1fQ.CjeYF8BVSKrRnAFk4AQ7LuMv8LZuF5qcOm9wO8pW1Gg",
            },
          }
        );

        if (!response.body) return setError("Error getting response from AI");

        const reader = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += value;
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const event of events) {
            if (event.startsWith("data: ")) {
              const data = event.slice(6);
              try {
                const msg = JSON.parse(data);
                if (typeof msg.content === "object") {
                  msg.content = JSON.stringify(msg.content, null, 2);
                }
                setMessages((prev) => [...prev, msg]);
              } catch (err) {
                console.error("Parse error:", err);
              }
            }
          }
        }
        if (buffer.trim()) {
          try {
            const msg = JSON.parse(buffer);
            setMessages((prev) => [...prev, msg]);
          } catch (err) {
            console.error("Failed to parse final buffer:", buffer, err);
          }
        }
      } catch (err: any) {
        setError(err);
        console.error("Error sending message:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearMessages,
  };
}
