import { createContext, useContext } from "react";
import { Editor } from "./editor";

const editor = new Editor();
const editorContext = createContext(editor);
export const useEditor = () => useContext(editorContext);
