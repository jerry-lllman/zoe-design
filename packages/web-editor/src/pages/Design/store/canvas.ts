import _ from 'lodash-es'
import { uniqueId } from '@web/tools'

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
	// 画布数据
	private canvas: CanvasType
	// 注册的组件更新函数？？？
	private forceUpdate: Function | null = null
	constructor(_canvas = getDefaultCanvas()) {
		this.canvas = _canvas
	}

	// 获取整个画布数据
	getCanvas() {
		return {...this.canvas}
	}

	// 获取所有组件数据
	getCanvasComponents() {
		return [...this.canvas.components]
	}

	// 新增组件
	addComponent(component: any) {
		this.canvas.components.push(_.cloneDeep({...component, id: uniqueId()}))

		this.updateApp()
	}

	// 更新画布
	updateApp(){
		this.forceUpdate?.()
	}

	subscribe(forceUpdate: Function) {
		this.forceUpdate = forceUpdate
		return () => {
		this.forceUpdate = null
		}
	}
}