import { textComponentsJson } from "../../Left/componentTypes"

export default function TextLib() {
	

	return (
		<div>
			{
				textComponentsJson.map((item, index) => (
					<div key={index}>{item.title}</div>
				))
			}
		</div>
	)
}