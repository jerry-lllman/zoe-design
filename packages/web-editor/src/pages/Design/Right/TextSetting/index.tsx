import { Input, Tabs } from "antd";
import ColorPicker from "../../../../components/ColorPicker";
import { useDesignStore } from "../../../../stores/design";


export default function TextSetting() {

	const canvas = useDesignStore(({ getActiveComponents, updateActiveComponents }) => ({ getActiveComponents, updateActiveComponents }))

	const componentData = canvas.getActiveComponents()[0]

	const TextBaseSetting = (
		<div>
			<div>
				<div>样式</div>
				<ColorPicker color={componentData.style.color} onChange={ color => canvas.updateActiveComponents({ style: { color }}) } />
			</div>
		</div>
	)

	const items = [
		{
			key: 'text',
			label: '文字',
			children: TextBaseSetting
		},
		{
			key: 'animate',
			label: '动画',
			children: <div>组件待开发</div>
		}
	]

	return (
		<div>
			<Tabs items={items} />
		</div>
	)
}