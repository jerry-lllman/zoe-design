import React from "react"
import { TextComponentType } from "../../pages/Design/LeftExpand/TextLib/typing"


interface TextComponentProps {
	component: TextComponentType
}

const Text = (props: TextComponentProps, ref: React.LegacyRef<HTMLDivElement>) => {

	const { component } = props

	return (

		<div
			className="element-inner relative w-full h-full text-[0]"
			style={{
				textAlign: 'left',
				lineHeight: 1.2,
				width: component.style.width,
				height: component.style.height,

				overflow: 'visible'
			}}
		>

			<div className="element-inner-position absolute top-0 left-0 w-full h-full"	>
				<div
					className="element-inner-content"
					style={{
						width: component.style.width,
						height: component.style.height

					}}
				>
					<div
						ref={ref}
						className="element-main inline-block"
						style={{
							fontSize: component.style.fontSize,
							minHeight: ((component.style.height as number) / ((component.style.height as number) / (component.style.fontSize as number)))
						}}
					>
						<span
							className="text"
							style={{
								fontSize: component.style.fontSize
							}}
						>{component.value}</span>
					</div>
				</div>
			</div>
		</div>
	)
}


const TextComponent = React.forwardRef(Text)

// TODO: 尝试通过 component.type 来匹配 displayName 渲染展示组件

export default TextComponent