import _, { clone, isEmpty, isNil } from 'lodash-es'
import { randomId } from '@web/tools'
import { ComponentType } from '../LeftExpand/typing'

interface EditorType {
	title: string,
	style: React.CSSProperties,
	components: ComponentType[]
}

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




// interface Block {
// 	type: string,
// 	grips: {
// 		east: boolean,
// 		southeast: boolean,
// 		south: boolean,
// 		southwest: boolean,
// 		west: boolean,
// 		northwest: boolean,
// 		north: boolean,
// 		northeast: boolean
// 	},
// 	style: {
// 		top: number,
// 		left: number,
// 		width: number,
// 		height: number
// 	}
// }


export type DragGripStatusType = 'east' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest' | 'north' | 'northeast'

export interface DragBlockStatusType {
	block: 'static' | 'moving' | 'hide'
	grip: DragGripStatusType | ''
}

export interface CanvasType {
	[x: string]: any
	components: ComponentType[]
}


function getGrips(components: ComponentType[]) {

	if (isEmpty(components)) {
		return {
			east: true,
			southeast: true,
			south: true,
			southwest: true,
			west: true,
			northwest: true,
			north: true,
			northeast: true
		}
	}

	if (components.length > 1) {
		return {
			east: false,
			southeast: true,
			south: false,
			southwest: true,
			west: false,
			northwest: true,
			north: false,
			northeast: true
		}
	}

	// TODO: 这里到底是放到生成组件的时候，还是单独写个生成函数呢（按照个人感觉而言写单独的生成函数会比较好一点）
	const comp = components[0]

	if (comp.type === 'text') {
		return {
			east: true,
			southeast: true,
			south: false,
			southwest: true,
			west: true,
			northwest: true,
			north: false,
			northeast: true
		}
	}

	return {
		east: true,
		southeast: true,
		south: true,
		southwest: true,
		west: true,
		northwest: true,
		north: true,
		northeast: true
	}
}


export default class Canvas {
	// 画布数据
	private canvas: CanvasType
	// 更新页面函数
	private forceUpdate: Function | null = null
	// 选中的组件
	private activeComponentIds: Set<string> = new Set()

	// 拖拽块的状态
	private blockStatus: DragBlockStatusType = {
		block: 'hide', // 整体块状态
		grip: '' // 当前拖拽的抓手
	}

	// 组件的真实dom，目前主要是因为需要自适应 text 组件的高度所需要
	private componentInstances = new WeakMap<ComponentType, HTMLDivElement>()

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
	addComponent(component: ComponentType) {
		const id = randomId()
		this.canvas.components.push(_.cloneDeep({ ...component, id }))
		this.clearActiveComponents()
		this.addActiveComponent(id)
		this.updateBlockStatus({ block: 'static' })
		this.updateApp()
	}

	// 移动更新组件位置
	// TODO: style 类型需要更新
	updateActiveComponentsStyle(style: { height?: number, width?: number, top?: number, left?: number }) {
		this.getActiveComponents().forEach(component => {
			const newStyle = clone(component.style)
			Object.keys(style).forEach((key) => {
				// @ts-ignore
				newStyle[key] += style[key]
			})

			const isZoomGrip = ['southeast', 'southwest', 'northwest', 'northeast'].includes(this.blockStatus.grip)

			if (component.type === 'text') {
				if (isZoomGrip && !isNil(style.width) && style.width !== 0) {
					// 1. 计算出一行能容下几个字 										 										  													oneLineTextCount = oldWidth / oldFontSize
					// 2. 根据新的 width 计算出新的 fontSize			  										 														newFontSize = newWidth / oneLineTextCount
					// 3. 根据新的 fontSize * 原高度能容纳下的行数(oldHeight / oldFontSize)计算出新的 height						newHeight = newFontSize * (oldHeight / oldFontSize)
	
					const oneLineTextCount = (component.style.width as number) / (component.style.fontSize as number)
					const newFontSize = (newStyle.width as number) / oneLineTextCount
					const newHeight = newFontSize * ((component.style.height as number) / (component.style.fontSize as number))
					newStyle.fontSize = newFontSize
					newStyle.height = newHeight
				} else {
					// 当宽度改变时字体可能会换行，所以需要更新根据文本的高度更新容器的高度
					newStyle.height = (this.componentInstances.get(component) as HTMLDivElement).clientHeight
				}
			}
			component.style = newStyle
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
		this.updateBlockStatus({ block: 'hide' })
		this.updateApp()
	}

	// 选中单个组件
	setSelectedComponentId(componentId: string, single = true) {
		if (this.activeComponentIds.has(componentId)) return
		single && this.clearActiveComponents()
		this.addActiveComponent(componentId)
		this.updateBlockStatus({ block: 'static' })
		this.updateApp()
	}

	// 更新拖拽块的状态
	updateBlockStatus(status: Partial<DragBlockStatusType>) {
		if (status.block === 'hide') {
			status.grip = ''
		}
		this.blockStatus = { ...this.blockStatus, ...status }
		this.updateApp()
	}

	// 获取真实拖拽块的信息
	getDragBlockInfo() {
		const components = this.getActiveComponents()

		const dragBlockInfo = {
			blockStatus: this.blockStatus,
			type: '',
			// TODO: 需要根据不同的组件给予不同的抓手，可能是在这里，也可能是在选中的时候处理
			grips: getGrips(components),
			style: {
				top: Infinity,
				left: Infinity,
				width: -Infinity,
				height: -Infinity
			}
		}

		if (components.length === 0) return dragBlockInfo

		// 拖拽组件的 width 获取：每个组件都计算出自己的 right(left + width) ，最后通过 maxRight - minLeft 就能获得拖拽的宽度
		let maxRight = -Infinity
		// height 获取方式同理
		let maxHeight = -Infinity

		components.forEach(item => {
			dragBlockInfo.type = item.type
			// 取最小的 top、left 作为 拖拽块的 left、top
			dragBlockInfo.style.top = Math.min(dragBlockInfo.style.top, (item.style.top as number))
			dragBlockInfo.style.left = Math.min(dragBlockInfo.style.left, (item.style.left as number))
			// 更新 maxRight、maxHeight
			maxRight = Math.max(maxRight, (item.style.left as number) + (item.style.width as number))
			maxHeight = Math.max(maxHeight, (item.style.top as number) + (item.style.height as number))
		})

		dragBlockInfo.style.width = maxRight - dragBlockInfo.style.left
		dragBlockInfo.style.height = maxHeight - dragBlockInfo.style.top

		if (components.length > 1) {
			// GROUP 需要定义成常量
			dragBlockInfo.type = 'GROUP'
		}

		return dragBlockInfo
	}

	setDomInstance(component: ComponentType, instance: HTMLDivElement | null) {
		instance && this.componentInstances.set(component, instance)
	}
}

