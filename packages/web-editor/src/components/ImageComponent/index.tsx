import { ImageComponentType } from "../../pages/Design/LeftExpand/ImgLib/typing."

interface ImageComponentProps {
	component: ImageComponentType
}

export default function ImageComponent(props: ImageComponentProps) {

	const { component } = props

	return (
		<div style={component.style}>
			<img className="w-full h-full" src={component.value} />
		</div>
	)
}
