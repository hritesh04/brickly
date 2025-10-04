import { createContext, useContext } from "react";
import { ProjectManager } from "./project";

const projectManager = new ProjectManager();
const projectContext = createContext(projectManager);
export const useProjectManager = () => useContext(projectContext);
