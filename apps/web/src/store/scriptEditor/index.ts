import { createContext, useContext } from "react";
import { ScriptEditor } from "./scriptEditor";

const scriptEditor = new ScriptEditor();
const scriptEditorContext = createContext(scriptEditor);
export const useScriptEditor = () => useContext(scriptEditorContext);
