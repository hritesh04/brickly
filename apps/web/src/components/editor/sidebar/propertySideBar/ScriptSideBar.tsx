"use client";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, Save } from "lucide-react";
import { useState } from "react";

const ScriptSideBar = observer(() => {
  const editor = useEditor();
  const activeNode = editor.activeNode;
  const [script, setScript] = useState("");

  if (!activeNode) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-600">Please select a Node to edit its script</p>
      </div>
    );
  }

  const handleSaveScript = () => {
    console.log("Saving script:", script);
  };

  const handleRunScript = () => {
    console.log("Running script:", script);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Script Editor</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleSaveScript}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" onClick={handleRunScript}>
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Node: {activeNode.name}
          </label>
          <Textarea
            placeholder="// Write your script here
console.log('Hello from ' + this.name);

// Available APIs:
// - this.transform.position
// - this.transform.rotation  
// - this.transform.scale
// - this.setProperty(property, value)
// - this.getProperty(property)"
            value={script}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setScript(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Tips:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use <code>this</code> to reference the current node</li>
            <li>Scripts run in the game loop context</li>
            <li>Use console.log() for debugging</li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
});

export default ScriptSideBar;
