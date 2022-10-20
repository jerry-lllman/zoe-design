import { textComponentsJson } from "../../Left/componentTypes"
import { useCanvasByContext } from "../../store/hooks"

export default function TextLib() {

	const canvas = useCanvasByContext()


	return (
		<div className="grid grid-cols-3 gap-4 p-[24px] text-center">
			{
				textComponentsJson.map((item, index) => (
					<div
						key={index}
						className="p-4 rounded-lg shadow transition duration-300 hover:shadow-md hover:delay-150 cursor-pointer"
						onClick={() => canvas.addComponent(item)}
					>
						{item.title}
					</div>
				))
			}
		</div>
	)
}