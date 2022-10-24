import _ from 'lodash-es'
import { uniqueId } from '@web/tools'

import { ComponentType, textComponentsJson } from "../Left/componentTypes"
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
		components: []
	}
}

export interface CanvasType {
	[x: string]: any
	components: ComponentType[]
}

export default class Canvas {
	// 画布数据
	private canvas: CanvasType
	// 更新页面函数
	private forceUpdate: Function | null = null
	// 选中的组件
	private activeComponentIds: Set<string> = new Set()
	// 实际拖拽的组件的样式
	private dragBlock: any

	constructor(_canvas = getDefaultCanvas()) {
		this.canvas = _canvas
	}

	// 获取整个画布数据
	getCanvas() {
		return { ...this.canvas }
	}

	// 获取所有组件数据
	getCanvasComponents() {
		return [...this.canvas.components]
	}

	// 新增组件
	addComponent(component: any) {
		const id = uniqueId()
		this.canvas.components.push(_.cloneDeep({ ...component, id }))
		this.clearActiveComponents()
		this.addActiveComponent(id)
		this.updateApp()
	}

	// 移动更新组件位置
	updateDragStyle(style: any) {
		this.getActiveComponents().forEach(component => {
			_.merge(component.style, style)
		})
		this.updateApp()
	}

	// 更新画布
	private updateApp() {
		this.forceUpdate?.()
	}

	// 使用时订阅更新事件以保存 update 方法
	subscribe(forceUpdate: Function) {
		this.forceUpdate = forceUpdate
		return () => {
			this.forceUpdate = null
		}
	}

	// 添加选中的组件
	private addActiveComponent(actives: string | string[]) {
		actives = _.isArray(actives) ? actives : [actives]
		actives.forEach(id => this.activeComponentIds.add(id))
	}

	// 获取被选中的组件
	getActiveComponents() {
		const components: ComponentType[] = []
		this.activeComponentIds.forEach(id => {
			const comp = this.canvas.components.find(component => component.id === id) as ComponentType
			components.push(comp)
		})

		return components
	}

	// 清空选中的组件
	clearActiveComponents() {
		this.activeComponentIds.clear()
		this.updateApp()
	}

	// 选中单个组件
	setSelectedComponentId(componentId: string) {
		if (this.activeComponentIds.has(componentId)) return

		this.clearActiveComponents()
		this.addActiveComponent(componentId)
		this.updateApp()
	}

	// 由选中的组件计算出组成的拖拽块的大小
	// todo: 需要更新到实际拖拽的 dragBlock 变量上
	getDragBlockInfo() {
		const dragBlockInfo = {
			type: '',
			grips: {
				east: true,
				southeast: true,
				south: true,
				southwest: true,
				west: true,
				northwest: true,
				north: true,
				northeast: true
			},
			style: {
				top: 0,
				left: 0,
				width: 0,
				height: 0
			}
		}
		const components = this.getActiveComponents()
		const componentCount = components.length
		if (componentCount === 0) return dragBlockInfo

		const getMax = (prev: any, next: any) => {
			Object.keys(prev).forEach(key => {
				prev[key] = Math.max(prev[key], next[key])
			})

			return prev
		}

		components.forEach(item => {
			dragBlockInfo.type = item.type
			dragBlockInfo.style = getMax(dragBlockInfo.style, item.style) as unknown as typeof dragBlockInfo.style
		})

		if (componentCount > 1) {
			// GROUP 需要定义成常量
			dragBlockInfo.type = 'GROUP'
		}

		return dragBlockInfo
	}
}