import { useState } from "react"
import { DragGripStatusType, useDesignStore } from "../../../../stores/design"

const calculate = (style: { width: number, height: number, top: number, left: number }) => {
	const { width, height, top, left } = style

	return {
		east: { width },
		southeast: { width, height },
		south: { height },
		southwest: { width: -width, height, left },
		west: { width: -width, left },
		northwest: { width: -width, height: -height, top, left },
		north: { height: -height, top },
		northeast: { width, height: -height, top }
	}
}

export default function useDragBlockStore() {

	const canvas = useDesignStore(({
		getActiveComponents,
		updateBlockStatus,
		updateActiveComponents,
		getDragBlockInfo
	}) => ({
		getActiveComponents,
		updateBlockStatus,
		updateActiveComponents,
		getDragBlockInfo
	}))


	// 选中的目标被点击事件
	const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault()
		e.stopPropagation()
		e.preventDefault()
		let { pageX: startX, pageY: startY } = e

		const mouseMove = (e: MouseEvent) => {
			const { pageX, pageY } = e

			// 获得移动的距离
			let disX = pageX - startX
			let disY = pageY - startY

			canvas.updateBlockStatus({ block: 'moving' })

			const style = { left: disX, top: disY }

			const dragStyle = canvas.getDragBlockInfo().style

			Object.keys(style).forEach(key => {
				// @ts-ignore
				style[key] += dragStyle[key]
			})


			canvas.updateActiveComponents({ style })

			// 更新起点
			startX = pageX
			startY = pageY
		}

		// 松鼠标时移除监听事件
		const mouseUp = () => {
			canvas.updateBlockStatus({ block: 'static' })
			document.removeEventListener('mousemove', mouseMove)
			document.removeEventListener('mouseup', mouseUp)
		}

		// 监听移动事件
		document.addEventListener('mousemove', mouseMove)
		document.addEventListener('mouseup', mouseUp)
	}

	// 点击选中的块四周设置大小的点的事件
	const onGripMouseDown = (type: DragGripStatusType) => {

		return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
			e.stopPropagation()
			e.preventDefault()
			let { pageX: startX, pageY: startY } = e

			const mouseMove = (e: MouseEvent) => {
				const { pageX, pageY } = e

				const disX = pageX - startX
				const disY = pageY - startY

				canvas.updateBlockStatus({ block: 'moving', grip: type })

				const style = calculate({ width: disX, height: disY, top: disY, left: disX })[type]

				const dragStyle = canvas.getDragBlockInfo().style

				Object.keys(style).forEach(key => {
					// @ts-ignore
					style[key] += dragStyle[key]
				})

				canvas.updateActiveComponents({style})

				// 更新起点
				startX = pageX
				startY = pageY
			}

			// 松鼠标时移除监听事件
			const mouseUp = () => {
				canvas.updateBlockStatus({ block: 'static' })
				document.removeEventListener('mousemove', mouseMove)
				document.removeEventListener('mouseup', mouseUp)
			}

			// 监听移动事件
			document.addEventListener('mousemove', mouseMove)
			document.addEventListener('mouseup', mouseUp)
		}
	}

	const [isShowTextEditor, setIsShowTextEditor] = useState(false)

	const editTextHandle = () => {
		setIsShowTextEditor(true)
		canvas.updateActiveComponents({ style: { visibility: 'hidden' } })
	}

	const onTextEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
		const { clientHeight: height, clientWidth: width, innerText: value } = e.target as HTMLDivElement
		canvas.updateActiveComponents({ value, style: { height, width } })
	}

	return {
		dragBlockInfo: canvas.getDragBlockInfo(),
		getActiveComponents: canvas.getActiveComponents,
		onMouseDown,
		onGripMouseDown,
		isShowTextEditor,
		setIsShowTextEditor,
		onTextEditorInput,
		editTextHandle,
		updateActiveComponents: canvas.updateActiveComponents
	}
}