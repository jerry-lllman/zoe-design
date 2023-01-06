import React from "react"

import { useCanvasByContext } from "../store/hooks"
import DragBlock from "./DragBlock"

import './index.less'

export default function Center() {

	const canvas = useCanvasByContext()

	const canvasData = canvas.getCanvas()

	const { style, components } = canvasData

	const selectCanvas = (e: any) => {
		if (e.target.id === 'editor-background') {
			canvas.clearActiveComponents()
		}
	}

	const addActiveComponent = (id: string) => {
		return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			canvas.setSelectedComponentId(id, !e.metaKey)
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
								// 组件展示
								components.map((item) => (
									<div key={item.id} className="editor-element absolute z-[1] leading-[1] text-left" style={{ ...item.style }}
										onClick={addActiveComponent(item.id)}
									>
										<div
											className="element-inner relative w-full h-full text-[0]"
											style={{
												textAlign: 'left',
												lineHeight: 1.2,
												width: item.style.width,
												height: item.style.height,

												overflow: 'visible'
											}}
										>

											<div className="element-inner-position absolute top-0 left-0 w-full h-full"	>
												<div
													className="element-inner-content"
													style={{
														width: item.style.width,
														height: item.style.height

													}}
												>
													<div
														ref={ref => canvas.setDomInstance(item, ref)}
														className="element-main inline-block"
														style={{
															fontSize: item.style.fontSize,
															minHeight: (item.style.height / (item.style.height / (item.style.fontSize)))
														}}
													>
														<span
														className="text"
															style={{
																fontSize: item.style.fontSize
															}}
														>{item.value}</span>
													</div>
												</div>
											</div>
										</div>
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