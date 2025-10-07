import { makeAutoObservable } from "mobx";
import { 
  createSignal, 
  updateSignal, 
  deleteSignal, 
  getSignals 
} from "@/actions/signal";
import { 
  createScript, 
  updateScript, 
  deleteScript, 
  getScript,
  getScripts
} from "@/actions/script";
import { 
  createAction, 
  updateAction, 
  deleteAction, 
  getActions 
} from "@/actions/action";
import { 
  createTrigger, 
  updateTrigger, 
  deleteTrigger, 
  getTriggers 
} from "@/actions/trigger";
import { 
  CreateSignalInput, 
  UpdateSignalInput, 
  DeleteSignalInput,
  signal 
} from "@/actions/signal/schema";
import { 
  CreateScriptInput, 
  UpdateScriptInput, 
  DeleteScriptInput,
  script 
} from "@/actions/script/schema";
import { 
  CreateActionInput, 
  UpdateActionInput, 
  DeleteActionInput,
  action 
} from "@/actions/action/schema";
import { 
  CreateTriggerInput, 
  UpdateTriggerInput, 
  DeleteTriggerInput,
  trigger 
} from "@/actions/trigger/schema";

export class ScriptEditor {
  // Current script being edited
  activeScript: script | null = null;
  
  // Script data
  scripts: script[] = [];
  actions: action[] = [];
  triggers: trigger[] = [];
  signals: signal[] = [];
  
  // UI state
  selectedAction: action | null = null;
  selectedTrigger: trigger | null = null;
  selectedSignal: signal | null = null;
  
  // Auto-save functionality
  saveTimer: NodeJS.Timeout | null = null;
  dirty: boolean = false;
  
  // Loading states
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.saveTimer = null;
    this.autoSave();
  }

  // Auto-save functionality
  autoSave() {
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
    }
    this.saveTimer = setInterval(() => {
      if (!this.activeScript || !this.dirty) return;
      this.saveScript();
    }, 3000);
  }

  // Load all scripts
  async loadAllScripts() {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await getScripts();
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      this.scripts = result.data || [];
    } catch (error) {
      this.error = "Failed to load scripts";
      console.error("Failed to load scripts:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Script management
  async loadScript(scriptId: number) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await getScript(scriptId);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      this.activeScript = result.data || null;
      this.dirty = false;
      
      // Load related data
      if (this.activeScript) {
        await this.loadScriptData(scriptId);
      }
    } catch (error) {
      this.error = "Failed to load script";
      console.error("Failed to load script:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadScriptData(scriptId: number) {
    try {
      // Load actions for this script
      const actionsResult = await getActions();
      if (actionsResult.data) {
        this.actions = actionsResult.data.filter(a => a.scriptID === scriptId);
      }

      // Load triggers for this script
      const triggersResult = await getTriggers();
      if (triggersResult.data) {
        this.triggers = triggersResult.data.filter(t => t.scriptID === scriptId);
      }

      // Load signals for this script
      const signalsResult = await getSignals();
      if (signalsResult.data) {
        this.signals = signalsResult.data; // Signals might not be script-specific
      }
    } catch (error) {
      console.error("Failed to load script data:", error);
    }
  }

  async createScript(data: CreateScriptInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await createScript(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        this.scripts.push(result.data);
        this.activeScript = result.data;
        this.dirty = false;
        
        // Load empty data for new script
        this.actions = [];
        this.triggers = [];
        this.signals = [];
      }
    } catch (error) {
      this.error = "Failed to create script";
      console.error("Failed to create script:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async saveScript() {
    if (!this.activeScript || !this.dirty) return;
    
    try {
      const result = await updateScript({
        id: this.activeScript.id,
        name: this.activeScript.name,
        content: this.activeScript.content || undefined,
      });
      
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        this.activeScript = result.data;
        this.dirty = false;
      }
    } catch (error) {
      this.error = "Failed to save script";
      console.error("Failed to save script:", error);
    }
  }

  async deleteScript(scriptId: number) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await deleteScript({ id: scriptId });
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      this.scripts = this.scripts.filter(s => s.id !== scriptId);
      if (this.activeScript?.id === scriptId) {
        this.activeScript = null;
      }
    } catch (error) {
      this.error = "Failed to delete script";
      console.error("Failed to delete script:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Action management
  async createAction(data: CreateActionInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await createAction(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        this.actions.push(result.data);
        this.dirty = true;
      }
    } catch (error) {
      this.error = "Failed to create action";
      console.error("Failed to create action:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async updateAction(data: UpdateActionInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await updateAction(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        const index = this.actions.findIndex(a => a.id === data.id);
        if (index !== -1) {
          this.actions[index] = result.data;
        }
        this.dirty = true;
      }
    } catch (error) {
      this.error = "Failed to update action";
      console.error("Failed to update action:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async deleteAction(actionId: number) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await deleteAction({ id: actionId });
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      this.actions = this.actions.filter(a => a.id !== actionId);
      this.dirty = true;
    } catch (error) {
      this.error = "Failed to delete action";
      console.error("Failed to delete action:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Trigger management
  async createTrigger(data: CreateTriggerInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await createTrigger(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        this.triggers.push(result.data);
        this.dirty = true;
      }
    } catch (error) {
      this.error = "Failed to create trigger";
      console.error("Failed to create trigger:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async updateTrigger(data: UpdateTriggerInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await updateTrigger(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        const index = this.triggers.findIndex(t => t.id === data.id);
        if (index !== -1) {
          this.triggers[index] = result.data;
        }
        this.dirty = true;
      }
    } catch (error) {
      this.error = "Failed to update trigger";
      console.error("Failed to update trigger:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async deleteTrigger(triggerId: number) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await deleteTrigger({ id: triggerId });
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      this.triggers = this.triggers.filter(t => t.id !== triggerId);
      this.dirty = true;
    } catch (error) {
      this.error = "Failed to delete trigger";
      console.error("Failed to delete trigger:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Signal management
  async createSignal(data: CreateSignalInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await createSignal(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        this.signals.push(result.data);
        this.dirty = true;
      }
    } catch (error) {
      this.error = "Failed to create signal";
      console.error("Failed to create signal:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async updateSignal(data: UpdateSignalInput) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await updateSignal(data);
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      if (result.data) {
        const index = this.signals.findIndex(s => s.id === data.id);
        if (index !== -1) {
          this.signals[index] = result.data;
        }
        this.dirty = true;
      }
    } catch (error) {
      this.error = "Failed to update signal";
      console.error("Failed to update signal:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async deleteSignal(signalId: number) {
    try {
      this.isLoading = true;
      this.error = null;
      
      const result = await deleteSignal({ id: signalId });
      if (result.error) {
        this.error = result.error;
        return;
      }
      
      this.signals = this.signals.filter(s => s.id !== signalId);
      this.dirty = true;
    } catch (error) {
      this.error = "Failed to delete signal";
      console.error("Failed to delete signal:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // UI state management
  setActiveScript(script: script | null) {
    this.activeScript = script;
    this.dirty = false;
  }

  setSelectedAction(action: action | null) {
    this.selectedAction = action;
  }

  setSelectedTrigger(trigger: trigger | null) {
    this.selectedTrigger = trigger;
  }

  setSelectedSignal(signal: signal | null) {
    this.selectedSignal = signal;
  }

  // Utility methods
  getActionsForScript(scriptId: number): action[] {
    return this.actions.filter(a => a.scriptID === scriptId);
  }

  getTriggersForScript(scriptId: number): trigger[] {
    return this.triggers.filter(t => t.scriptID === scriptId);
  }

  getActionsForTrigger(triggerId: number): action[] {
    return this.actions.filter(a => a.triggerID === triggerId);
  }

  // Mark as dirty when changes are made
  markDirty() {
    this.dirty = true;
  }

  // Clear error
  clearError() {
    this.error = null;
  }

  // Reset store
  reset() {
    this.activeScript = null;
    this.scripts = [];
    this.actions = [];
    this.triggers = [];
    this.signals = [];
    this.selectedAction = null;
    this.selectedTrigger = null;
    this.selectedSignal = null;
    this.dirty = false;
    this.error = null;
    this.isLoading = false;
  }
}
