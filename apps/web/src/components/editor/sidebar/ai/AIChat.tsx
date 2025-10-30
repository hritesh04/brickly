// AIChat.tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AIMessage from "./AIMessage";
import ChatInput from "./ChatInput";
import useAI from "@/hooks/useAI";
import { useEffect, useRef } from "react";

export default function AIChat() {
  const { messages, sendMessage } = useAI();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden py-2">
      <ScrollArea className="flex-1 overflow-y-auto max-h-[72.5%]">
        <div className="min-h-0 py-1">
          <AIMessage messages={messages} />
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <div className="flex-shrink-0 w-full mt-2">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
