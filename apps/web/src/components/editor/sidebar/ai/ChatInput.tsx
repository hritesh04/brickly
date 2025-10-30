"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatInput({
  sendMessage,
}: {
  sendMessage: (content: string) => Promise<void>;
}) {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="relative w-full">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="resize-none pb-12 min-h-[100px] max-h-[200px] overflow-y-auto"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <div className="absolute bottom-0 p-2 justify-between flex w-full">
        <Button className="p-1" size="icon-sm" variant="ghost">
          <Plus />
        </Button>
        <Button className="p-1" size="icon-sm" onClick={handleSend}>
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
}
