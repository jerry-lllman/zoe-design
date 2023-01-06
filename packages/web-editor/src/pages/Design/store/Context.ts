import { createContext } from "react";
import { CLASSIFY } from "../Left/componentTypes";
import Canvas from "./canvas";

export const CanvasContext = createContext<Canvas>(new Canvas())


export const LeftContext = createContext({
	leftActiveKey: CLASSIFY.WORDS,
	setLeftActiveKey(value: CLASSIFY) {
		this.leftActiveKey = value
	}
})