import { createContext } from "react";
import Canvas from "./canvas";

export const CanvasContext = createContext<Canvas>(new Canvas())