import { useCanvasByContext } from "../store/hooks"

export default function Center() {

	// const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
	// 	console.log(e.pageX, e.pageY)
	// }

	const canvas = useCanvasByContext()

	const canvasData = canvas.getCanvas()

	const { style, components } = canvasData


	return (
		<div className=" absolute  bg-neutral-400 left-[393px] top-0 right-[276px] bottom-0">
			<div className="m-auto p-[30px] box-content" style={{ width: style.width, height: style.height }}>
				<div className="m-auto " style={{ ...style, backgroundImage: `url(${style.backgroundImage})` }}>
					<div style={{ width: style.width, height: style.height }} >
						{
							components.map((item, index) => (
								<div key={index}>
									{item.value}
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}