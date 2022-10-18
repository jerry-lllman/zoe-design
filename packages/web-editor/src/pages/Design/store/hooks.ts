import { useContext, useRef } from "react";
import Canvas from "./canvas";
import { CanvasContext } from "./Context";

export function useCanvas(canvas?: Canvas) {
	
	const canvasRef = useRef<Canvas>()

	if (!canvasRef.current) {
		canvasRef.current = canvas || new Canvas()
	}

	return canvasRef.current
}

export function useCanvasByContext() {
	return useContext(CanvasContext)
}