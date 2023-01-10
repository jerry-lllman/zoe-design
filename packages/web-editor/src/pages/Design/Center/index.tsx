import React, { useEffect } from "react"
import TextComponent from "../../../components/TextComponent"
import ImageComponent from "../../../components/ImageComponent"
import { useCanvasByContext } from "../store/hooks"
import DragBlock from "./DragBlock"

import './index.less'

export default function Center() {

	const canvas = useCanvasByContext()

	const canvasData = canvas.getCanvas()

	const { style, components } = canvasData

	const selectCanvas = (e: React.MouseEvent<HTMLDivElement>) => {
		canvas.clearActiveComponents()
		canvas.setIsActiveBackground(true)
		e.stopPropagation()
	}

	const addActiveComponent = (id: string) => {
		return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation()
			canvas.setSelectedComponentId(id, !e.metaKey)
			canvas.setIsActiveBackground(false)
		}
	}

	useEffect(() => {
		const handler = () => canvas.getIsActiveBackground() && canvas.setIsActiveBackground(false)


		const editorMainElement = document.getElementById('editor-main')
		editorMainElement?.addEventListener('click', handler)

		return () => {
			editorMainElement?.removeEventListener('click', handler)
		}
	}, [])

	return (
		<div
			id="editor-main"
			className=" absolute  bg-[#f0f3f4] left-[393px] top-0 right-[276px] bottom-0"
		>
			<div className="relative m-auto mt-[60px] box-content" style={{ width: style.width, height: style.height }}>
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
							</div>
							{
								// 组件展示
								components.map((item) => (
									<div key={item.id} className="editor-element absolute z-[1] leading-[1] text-left" style={{ ...item.style }}
										onClick={addActiveComponent(item.id)}
									>
										{item.type === 'text' && <TextComponent component={item} ref={ref => canvas.setDomInstance(item, ref)} />}
										{item.type === 'image' && <ImageComponent component={item} />}
									</div>
								))
							}
						</div>
					</div>
					{
						<div><DragBlock /></div>
					}
				</div>
				{
					canvas.getIsActiveBackground() && (
						<div
							className=" absolute top-0 left-0 border-2 border-solid border-sky-400 shadow-[0_0_0_4px_rgb(61,105,246,24%)]"
							style={{ width: style.width, height: style.height }}
						>
						</div>
					)
				}
			</div>
		</div>
	)
}