import _ from 'lodash-es'

import { textComponentsJson } from "../Left/componentTypes"
function getDefaultCanvas() {
	return {
		title: '未命名',
		style: {
			width: 320,
			height: 568,
			backgroundColor: '#ffffff',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
		},
		components: _.cloneDeep(textComponentsJson)
	}
}

export type CanvasType = ReturnType<typeof getDefaultCanvas>

export default class Canvas {
	private canvas: CanvasType
	constructor(_canvas = getDefaultCanvas()) {
		this.canvas = _canvas

	}

	getCanvas() {
		return {...this.canvas}
	}

	getCanvasComponents() {
		return [...this.canvas.components]
	}
}