import { useCanvasByContext } from "../../store/hooks"

export default function useDragBlockStore() {

	const canvas = useCanvasByContext()

	const onMouseDown = (e: any) => {
		e.preventDefault()
		let { pageX: startX, pageY: startY } = e
		
		const mouseMove = (e: any) => {
			const { pageX, pageY } = e
			
			// 获得移动的距离
			let disX = pageX - startX
			let disY = pageY - startY
			
			const { style } = canvas.getDragBlockInfo()
			canvas.updateBlockStatus('moving')
			canvas.updateActiveComponentsStyle({ left: disX, top: disY })

			// 更新起点
			startX = pageX
			startY = pageY
		}

		// 松鼠标时移除监听事件
		const mouseUp = () => {
			canvas.updateBlockStatus('static')
			document.removeEventListener('mousemove', mouseMove)
			document.removeEventListener('mouseup', mouseUp)
		}

		// 监听移动事件
		document.addEventListener('mousemove', mouseMove)
		document.addEventListener('mouseup', mouseUp)
	}

	return {
		dragBlockInfo: canvas.getDragBlockInfo(),
		onMouseDown
	}
}