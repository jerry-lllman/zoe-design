
import { create } from 'zustand'
import _, { cloneDeep } from 'lodash-es'
import { randomId } from '@web/tools'
import { ComponentType } from '../pages/Design/LeftExpand/typing'

export type DragGripStatusType = 'east' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest' | 'north' | 'northeast'

export interface DragBlockStatusType {
	block: 'static' | 'moving' | 'hide'
	grip: DragGripStatusType | ''
}

interface DragBlockInfoType {
	blockStatus: DragBlockStatusType
	type: string
	grips: ReturnType<typeof getGrips>
	style: {
		top: number,
		left: number,
		width: number,
		height: number
	}
}

interface StoreCanvasType {
	title: string;
	style: {
		width: number;
		height: number;
		backgroundColor: string;
		backgroundImage: string;
		backgroundPosition: string;
		backgroundSize: string;
		backgroundRepeat: string;
	};
	components: ComponentType[];
}

interface DesignStoreType {
	canvasData: StoreCanvasType,
	isActiveBackground: boolean,
	setCanvasBaseInfo: (canvas: DeepPartial<Omit<StoreCanvasType, 'components'>>) => void,
	setIsActiveBackground: (isActiveBackground: boolean) => void
	activeComponentIds: Set<string>
	addActiveComponent: (id: string) => void
	addComponent: (component: ComponentType) => void
	setSelectedComponentId: (componentId: string, isGroup?: boolean) => void
	getActiveComponents: () => ComponentType[]
	clearActiveComponents: () => void
	updateActiveComponentsStyle: (style: Partial<React.CSSProperties>) => void
	blockStatus: DragBlockStatusType
	updateBlockStatus: (status: Partial<DragBlockStatusType>) => void
	getDragBlockInfo: () => DragBlockInfoType
	setDomInstance: (componentId: string, instance: HTMLDivElement | null) => void
}

const componentInstances: Map<string, HTMLDivElement> = new Map()


const useDesignStore = create<DesignStoreType>((set, get): DesignStoreType => ({
	canvasData: {
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
	},
	isActiveBackground: false,
	// 设置 canvas 画布
	setCanvasBaseInfo(canvasData) {
		set({ canvasData: _.merge(get().canvasData, canvasData) })
	},

	setIsActiveBackground(isActiveBackground) {
		set({ isActiveBackground })
	},

	// 选中的组件 id
	activeComponentIds: new Set(),

	addActiveComponent(id) {
		const activeComponentIds = get().activeComponentIds
		activeComponentIds.add(id)
		set({ activeComponentIds })
	},

	addComponent(component) {
		const id = randomId()
		get().canvasData.components.push(_.cloneDeep({ ...component, id }))
		get().clearActiveComponents()
		get().addActiveComponent(id)
		get().updateBlockStatus({ block: 'static' })
		set({ isActiveBackground: false })
	},

	// 添加选中的组件
	// 是否多选
	setSelectedComponentId(componentId, isGroup = false) {
		if (get().activeComponentIds.has(componentId)) return
		!isGroup && get().clearActiveComponents()
		get().addActiveComponent(componentId)
		get().updateBlockStatus({ block: 'static' })
	},

	getActiveComponents() {
		const components: ComponentType[] = []
		get().activeComponentIds.forEach(id => {
			const comp = get().canvasData.components.find(component => component.id === id) as ComponentType
			components.push(cloneDeep(comp))
		})
		return components
	},

	clearActiveComponents() {
		set({ activeComponentIds: new Set() })
		get().updateBlockStatus({ block: 'hide' })
		//  get().activeComponentIds.clear() 
		//  get().updateBlockStatus({ block: 'hide' })
	},
	updateActiveComponentsStyle(style) {
		const components = get().getActiveComponents()
		components.forEach(component => {
			const isZoomGrip = ['southeast', 'southwest', 'northwest', 'northeast'].includes(get().blockStatus.grip)

			if (component.type === 'text') {
				const isChangeWidth = !_.isNil(style.width) && (component.style.width as number) - (style.width as number) !== 0
				// 缩放且改变了宽度需要重新计算高度
				if (isZoomGrip && isChangeWidth) {
					// 1. 计算出一行能容下几个字 										 										  													oneLineTextCount = oldWidth / oldFontSize
					// 2. 根据新的 width 计算出新的 fontSize			  										 														newFontSize = newWidth / oneLineTextCount
					// 3. 根据新的 fontSize * 原高度能容纳下的行数(oldHeight / oldFontSize)计算出新的 height						newHeight = newFontSize * (oldHeight / oldFontSize)

					const oneLineTextCount = (component.style.width as number) / (component.style.fontSize as number)
					const newFontSize = (style.width as number) / oneLineTextCount
					const newHeight = newFontSize * ((component.style.height as number) / (component.style.fontSize as number))
					style.fontSize = newFontSize
					style.height = newHeight
				} else {
					// 当宽度改变时字体可能会换行，所以需要更新根据文本的高度更新容器的高度
					style.height = (componentInstances.get(component.id) as HTMLDivElement).clientHeight
				}
			}
			_.merge(component.style, style)
		})

		const canvasData = get().canvasData

		const newComponents = canvasData.components.map(item => {
			const component = components.find(comp => comp.id === item.id)
			return component || item
		})

		canvasData.components = newComponents

		set({ canvasData })
	},

	blockStatus: {
		block: 'hide',
		grip: ''
	},

	updateBlockStatus(status) {
		if (status.block === 'hide') {
			status.grip = ''
		}
		set({ blockStatus: { ...get().blockStatus, ...status } })
	},


	// 获取真实拖拽块的信息
	getDragBlockInfo() {
		const components = get().getActiveComponents()

		const dragBlockInfo: DragBlockInfoType = {
			blockStatus: get().blockStatus,
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
	},


	setDomInstance(componentId, instance) {
		instance && componentInstances.set(componentId, instance)

		// 目前来讲只有 text 需要 dom 来计算宽高
		const textComponents = get().canvasData.components.filter(item => item.type === 'text')
		textComponents.forEach(component => {
			// 将已经不存在的组件删除掉
			if (!componentInstances.has(component.id)) {
				componentInstances.delete(component.id)
			}
		})

	}

}))


function getGrips(components: ComponentType[]) {

	if (_.isEmpty(components)) {
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


// export default useDesignStore

export {
	useDesignStore
}


