import { randomId } from "@web/tools"
import { useDesignStore } from "../../../../stores/design"
import { CLASSIFY } from "../../Left/componentTypes"
import { TextComponentType } from "./typing"


export const textComponents: TextComponentType[] = [
	{
		id: randomId(),
		type: 'text',
		rootType: CLASSIFY.WORDS,
		title: '文字',
		value: '双击编辑文字内容',
		icon: '',
		style: {
			top: 100,
			left: 0,
			width: 256,
			height: 38,
			fontSize: 32,
			fontWeight: 400
		}
	}
]
export default function TextLib() {
	
	const canvas = useDesignStore(({ addComponent }) => ({ addComponent }))

	return (
		<div className="grid grid-cols-3 gap-4 p-[24px] text-center">
			{
				textComponents.map((item, index) => (
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