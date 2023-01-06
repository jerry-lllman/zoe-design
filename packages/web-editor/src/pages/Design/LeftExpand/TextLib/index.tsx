import { randomId } from "@web/tools"
import { CLASSIFY } from "../../Left/componentTypes"
import { useCanvasByContext } from "../../store/hooks"
import { TextComponentType } from "./typing"


export const textComponents: TextComponentType[] = [
	{
		id: randomId(),
		type: 'text',
		rootType: CLASSIFY.WORDS,
		title: '标题',
		value: '双击编辑标题内容',
		icon: '',
		style: {
			top: 100,
			left: 100,
			width: 10,
			height: 12,
			fontSize: 10,
			fontWeight: 700
		}
	},
	{
		id: randomId(),
		type: 'text',
		rootType: CLASSIFY.WORDS,
		title: '正文',
		value: '双击编辑一小段正文',
		icon: '',
		style: {
			top: 100,
			left: 0,
			width: 298,
			height: 38,
			fontSize: 32,
			fontWeight: 400
		}
	}
]
export default function TextLib() {

	const canvas = useCanvasByContext()

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