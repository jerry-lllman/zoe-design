import { useEffect, useReducer } from "react";
import Center from "./Center";
import Header from "./Header";
import Left from "./Left";
import LeftExpand from "./LeftExpand";
import Right from "./Right";
import { CanvasContext } from "./store/Context";
import { useCanvas } from "./store/hooks";

export default function Design() {

	const canvas = useCanvas()
	const [,forceUpdate] = useReducer((x) => x + 1, 0)

	useEffect(() => {
		const unsubscribe = canvas.subscribe(forceUpdate)
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<div className="flex flex-col min-w-[1024px] overflow-x-auto h-screen">
			<CanvasContext.Provider value={canvas}>
				<Header />
				<div className="workbench-body relative flex-1">
					{/* 左边分类栏 */}
					<Left />
					{/* 左边素材栏 */}
					<LeftExpand />
					{/* 中间画布栏 */}
					<Center />
					{/* 右边设置栏 */}
					<Right />
				</div>
			</CanvasContext.Provider>
		</div>
	)
}