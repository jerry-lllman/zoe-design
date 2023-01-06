import { DragGripStatusType } from "../../store/canvas"
import { useCanvasByContext } from "../../store/hooks"


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

	const canvas = useCanvasByContext()

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
			canvas.updateActiveComponentsStyle({ left: disX, top: disY })

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

	const calculateMap = {
		text: (style: { width: number, height: number, top: number, left: number }) => {
			const { width, height, top, left } = style
	
			return {
				east: { width },
				southeast: { width },
				south: { height },
				southwest: { width: -width, height, left },
				west: { width: -width, left },
				northwest: { width: -width, height: -height, top, left },
				north: { height: -height, top },
				northeast: { width, height: -height, top }
			}
		}
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
				canvas.updateActiveComponentsStyle(style)

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

	return {
		dragBlockInfo: canvas.getDragBlockInfo(),
		onMouseDown,
		onGripMouseDown
	}
}