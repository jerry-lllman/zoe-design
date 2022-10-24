import { uniqueId } from "@web/tools"

enum CLASSIFY {
	WORDS,
	IMAGES,
}

enum COMPONENT_TYPE {
	TEXT = 'text',
}


export const componentsClass = [
	{
		type: CLASSIFY.WORDS,
		title: '文字',
		icon: ''
	},
	{
		type: CLASSIFY.IMAGES,
		title: '图片',
		icon: ''
	}
]


export type ComponentType = typeof textComponentsJson[0]

export const textComponentsJson = [
	{
		id: uniqueId(),
		type: COMPONENT_TYPE.TEXT,
		rootType: CLASSIFY.WORDS,
		title: '标题',
		value: '请输入标题',
		icon: '',
		style: {
			top: 100,
			left: 100,
			width: 100,
			height: 30,
			fontSize: 16,
			fontWeight: 400
		}
	},
	{
		id: uniqueId(),
		type: COMPONENT_TYPE.TEXT,
		rootType: CLASSIFY.WORDS,
		title: '文本',
		value: '请输入文本',
		icon: '',
		style: {
			top: 0,
			left: 0,
			width: 100,
			height: 30,
			fontSize: 14,
			fontWeight: 400
		}
	}
]

