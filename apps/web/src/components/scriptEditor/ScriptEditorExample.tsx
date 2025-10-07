"use client";

import { useScriptEditor } from "@/store/scriptEditor";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ScriptEditorExample = observer(() => {
  const scriptEditor = useScriptEditor();
  const [newScriptName, setNewScriptName] = useState("");
  const [newActionName, setNewActionName] = useState("");
  const [newTriggerName, setNewTriggerName] = useState("");

  const handleCreateScript = async () => {
    if (!newScriptName.trim()) return;
    
    await scriptEditor.createScript({
      name: newScriptName,
      content: "// New script content",
      nodeID: 1, // Mock node ID
    });
    
    setNewScriptName("");
  };

  const handleCreateAction = async () => {
    if (!newActionName.trim() || !scriptEditor.activeScript) return;
    
    await scriptEditor.createAction({
      name: newActionName,
      type: "MOVE_TO" as any, // Using ActionType enum from database
      scriptID: scriptEditor.activeScript.id,
    });
    
    setNewActionName("");
  };

  const handleCreateTrigger = async () => {
    if (!newTriggerName.trim() || !scriptEditor.activeScript) return;
    
    await scriptEditor.createTrigger({
      name: newTriggerName,
      type: "ready",
      scriptID: scriptEditor.activeScript.id,
    });
    
    setNewTriggerName("");
  };

  const handleSaveScript = async () => {
    if (scriptEditor.activeScript) {
      scriptEditor.markDirty();
      await scriptEditor.saveScript();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Script Editor Store Example</h2>
      
      {/* Error Display */}
      {scriptEditor.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {scriptEditor.error}
        </div>
      )}

      {/* Loading State */}
      {scriptEditor.isLoading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          Loading...
        </div>
      )}

      {/* Create Script */}
      <Card>
        <CardHeader>
          <CardTitle>Create Script</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Script name"
              value={newScriptName}
              onChange={(e) => setNewScriptName(e.target.value)}
            />
            <Button onClick={handleCreateScript} disabled={scriptEditor.isLoading}>
              Create Script
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Script */}
      {scriptEditor.activeScript && (
        <Card>
          <CardHeader>
            <CardTitle>Active Script: {scriptEditor.activeScript.name}</CardTitle>
            <Badge variant={scriptEditor.dirty ? "destructive" : "default"}>
              {scriptEditor.dirty ? "Unsaved Changes" : "Saved"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Script content"
              value={scriptEditor.activeScript.content || ""}
              onChange={(e) => {
                if (scriptEditor.activeScript) {
                  scriptEditor.activeScript.content = e.target.value;
                  scriptEditor.markDirty();
                }
              }}
              className="min-h-[200px]"
            />
            <Button onClick={handleSaveScript} disabled={!scriptEditor.dirty}>
              Save Script
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {scriptEditor.activeScript && (
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Action name"
                value={newActionName}
                onChange={(e) => setNewActionName(e.target.value)}
              />
              <Button onClick={handleCreateAction} disabled={scriptEditor.isLoading}>
                Add Action
              </Button>
            </div>
            
            <div className="space-y-2">
              {scriptEditor.getActionsForScript(scriptEditor.activeScript.id).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{action.name} ({action.type})</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => scriptEditor.deleteAction(action.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Triggers */}
      {scriptEditor.activeScript && (
        <Card>
          <CardHeader>
            <CardTitle>Triggers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Trigger name"
                value={newTriggerName}
                onChange={(e) => setNewTriggerName(e.target.value)}
              />
              <Button onClick={handleCreateTrigger} disabled={scriptEditor.isLoading}>
                Add Trigger
              </Button>
            </div>
            
            <div className="space-y-2">
              {scriptEditor.getTriggersForScript(scriptEditor.activeScript.id).map((trigger) => (
                <div key={trigger.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{trigger.name} ({trigger.type})</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => scriptEditor.deleteTrigger(trigger.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scripts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {scriptEditor.scripts.map((script) => (
              <div key={script.id} className="flex items-center justify-between p-2 border rounded">
                <span>{script.name}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => scriptEditor.setActiveScript(script)}
                  >
                    Load
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => scriptEditor.deleteScript(script.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default ScriptEditorExample;
