import classNames from "classnames"

import { useCanvasByContext } from "../store/hooks"
import DragBlock from "./DragBlock"


export default function Center() {

	const canvas = useCanvasByContext()

	const canvasData = canvas.getCanvas()

	const { style, components } = canvasData

	const selectCanvas = (e: any) => {
		if (e.target.id === 'editor-background') {
			canvas.clearActiveComponents()
		}
	}


	return (
		<div
			className=" absolute  bg-neutral-400 left-[393px] top-0 right-[276px] bottom-0"
		>
			<div className="m-auto p-[30px] box-content" style={{ width: style.width, height: style.height }}>
				<div
					id="editor-wrapper"
					className="m-auto relative"
					style={{ ...style, backgroundImage: `url(${style.backgroundImage})` }}
				>
					<div className=" absolute top-0 left-0 h-full w-full z-[1] overflow-hidden">
						<div style={{ width: style.width, height: style.height }} >
							<div
								id="editor-background"
								className="absolute left-0 right-0"
								style={{ width: style.width, height: style.height }}
								onClick={selectCanvas}
							>
								{/* 背景，选中边框效果 */}
							</div>
							{
								components.map((item) => (
									<div key={item.id} className="absolute" style={{ ...item.style }}
										onClick={() => canvas.setSelectedComponentId(item.id)}
									>
										<span>{item.value}</span>
									</div>
								))
							}
						</div>
					</div>
					{
						<div><DragBlock /></div>
					}
				</div>
			</div>
		</div>
	)
}