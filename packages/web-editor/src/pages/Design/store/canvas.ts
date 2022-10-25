import _, { cloneDeep, max } from 'lodash-es'
import { uniqueId } from '@web/tools'

import { ComponentType, textComponentsJson } from "../Left/componentTypes"
import React from 'react'


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




interface Block {
	type: string,
	grips: {
		east: boolean,
		southeast: boolean,
		south: boolean,
		southwest: boolean,
		west: boolean,
		northwest: boolean,
		north: boolean,
		northeast: boolean
	},
	style: {
		top: number,
		left: number,
		width: number,
		height: number
	}
}

type BLOCK_STATUS = 'hide' | 'static' | 'moving'

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

	private blockStatus: BLOCK_STATUS = 'hide'

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
		this.updateBlockStatus('static')
		this.updateApp()
	}

	// 移动更新组件位置
	updateActiveComponentsStyle(style: React.CSSProperties) {

		this.getActiveComponents().forEach(component => {
			Object.keys(style).forEach((key) => {
				// @ts-ignore
				component.style[key] += style[key]
			})
		})
		this.updateApp()
	}

	// 设置已选中的组件
	setActiveComponents(component: ComponentType) {

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
		this.updateBlockStatus('hide')
		this.updateApp()
	}

	// 选中单个组件
	setSelectedComponentId(componentId: string, single = true) {
		if (this.activeComponentIds.has(componentId)) return
		single && this.clearActiveComponents()
		this.addActiveComponent(componentId)
		this.updateBlockStatus('static')
		this.updateApp()
	}

	// 更新拖拽块的状态
	updateBlockStatus(status: BLOCK_STATUS) {
		this.blockStatus = status
		this.updateApp()
	}

	// 获取真实拖拽块的信息
	getDragBlockInfo() {
		const dragBlockInfo = {
			blockStatus: this.blockStatus,
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
				top: Infinity,
				left: Infinity,
				width: -Infinity,
				height: -Infinity
			}
		}
		const components = this.getActiveComponents()
		const componentCount = components.length
		if (componentCount === 0) return dragBlockInfo

		// 拖拽组件的 width 获取：每个组件都计算出自己的 right(left + width) ，最后通过 maxRight - minLeft 就能获得拖拽的宽度
		let maxRight = -Infinity
		// height 获取方式同理
		let maxHeight = -Infinity

		components.forEach(item => {
			dragBlockInfo.type = item.type
			dragBlockInfo.style.top = Math.min(dragBlockInfo.style.top, item.style.top)
			dragBlockInfo.style.left = Math.min(dragBlockInfo.style.left, item.style.left)

			maxRight = Math.max(maxRight, item.style.left + item.style.width)
			maxHeight = Math.max(maxHeight, item.style.top + item.style.height)
		})

		dragBlockInfo.style.width = maxRight - dragBlockInfo.style.left
		dragBlockInfo.style.height = maxHeight - dragBlockInfo.style.top
		
		if (componentCount > 1) {
			// GROUP 需要定义成常量
			dragBlockInfo.type = 'GROUP'
		}

		return dragBlockInfo
	}
}

