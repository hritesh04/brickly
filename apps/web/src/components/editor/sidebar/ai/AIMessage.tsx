import { Message } from "@/hooks/useAI";

export default function AIMessage({ messages }: { messages: Message[] }) {
  if (!messages || messages.length === 0) {
    return <div>Start Your AI powered Game Development Journey</div>;
  }

  return (
    <div className="flex flex-col w-full">
      {messages.map((m: Message, index: number) => {
        if (m.type === "tool_call" || typeof m.content === "object") {
          return (
            <div
              key={m.id || `msg-${index}`}
              className="p-2 my-1 max-w-[90%] rounded-lg bg-yellow-200 text-black self-center italic break-words overflow-hidden overflow-y-auto max-h-[60vh]"
            >
              [Tool Call]: {JSON.stringify(m.content, null, 2)}
            </div>
          );
        }

        if (m.role === "human") {
          return (
            <div
              key={m.id || `msg-${index}`}
              className="p-2 my-1 max-w-[90%] rounded-lg bg-blue-500 text-white self-end break-words overflow-hidden overflow-y-auto max-h-[60vh]"
            >
              {m.content}
            </div>
          );
        }

        if (m.role === "ai") {
          return (
            <div
              key={m.id || `msg-${index}`}
              className="p-2 my-1 max-w-[90%] rounded-lg bg-gray-200 text-black self-start break-words overflow-hidden overflow-y-auto max-h-[60vh]"
            >
              {m.content}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
