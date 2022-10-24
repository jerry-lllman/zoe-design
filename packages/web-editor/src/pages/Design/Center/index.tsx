import classNames from "classnames"

import { useCanvasByContext } from "../store/hooks"

import styles from './index.module.less'

export default function Center() {

	// const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
	// 	console.log(e.pageX, e.pageY)
	// }

	const canvas = useCanvasByContext()

	const canvasData = canvas.getCanvas()

	const { style, components } = canvasData

	const activeComponents = canvas.getActiveComponents()

	const selectCanvas = (e: any) => {
		if (e.target.id === 'editor-background') {
			canvas.clearActiveComponents()
		}
	}

	const editorGrip = classNames('absolute top-0 left-0 p-[4px] -translate-x-1/2 -translate-y-1/2', styles.editorGrip )

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
					<div style={{ width: style.width, height: style.height }} >
						<div
							id="editor-background"
							className="absolute left-0 right-0"
							style={{ width: style.width, height: style.height }}
							onClick={selectCanvas}
						>

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
					{
						<div>
							{/* 目前做的这种其实是错的，应该由这些组件，计算出这个div的top、left、width、height。 但暂时先实现拖拽一个组件的功能 */}
							{
								activeComponents.map(component => (
									<div
										key={component.id}
										className="absolute before:absolute before:w-full before:h-full before:border-dotted before:border-2 before:border-cyan-300"
										style={{ ...component.style }}

									>
										<i className={editorGrip}>
											<b className="block w-[10px] h-[10px] rounded-full bg-white"></b>
										</i>
									</div>
								))
							}
						</div>
					}
				</div>
			</div>
		</div>
	)
}