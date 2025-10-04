import { createContext, useContext } from "react";
import { ResourceStore } from "./resource";

export const resourceStore = new ResourceStore();
const resourceContext = createContext(resourceStore);
export const useResourceStore = () => useContext(resourceContext);


