import { createContext } from "react";
import { CLASSIFY } from "../Left/componentTypes";

export const LeftContext = createContext({
	leftActiveKey: CLASSIFY.WORDS,
	setLeftActiveKey(value: CLASSIFY) {
		this.leftActiveKey = value
	}
})