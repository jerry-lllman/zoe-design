import classNames from 'classnames'
import { DragGripStatusType } from '../../../../stores/design'
import GripComp from './GripComp'
import useDragBlockStore from './store'


export default function DragBlock() {
	const { dragBlockInfo, onMouseDown, onGripMouseDown } = useDragBlockStore()

	if (dragBlockInfo.blockStatus.block === 'hide') return null

	const blockClass = classNames(
		'absolute z-50 before:absolute before:w-full before:h-full before:border-dotted before:border-2 before:border-cyan-300',
		dragBlockInfo.blockStatus.block === 'moving' && 'before:border-1 before:border-cyan-100'
	)

	const isShowGrip = (type: DragGripStatusType) => {
		if (dragBlockInfo.blockStatus.block === 'hide') return false

		if (dragBlockInfo.blockStatus.block === 'static' && dragBlockInfo.grips[type]) return true

		if (dragBlockInfo.blockStatus.block === 'moving' && dragBlockInfo.blockStatus.grip === type) return true
	}

	return (
		<div
			className={blockClass}
			style={dragBlockInfo.style}
			onMouseDown={onMouseDown}
		>
			{isShowGrip('east') && (<GripComp className="left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-" gripContentClassName="w-[6px] h-[11px]" onMouseDown={onGripMouseDown('east')} />)}
			{isShowGrip('southeast') && (<GripComp className="left-full top-full -translate-x-1/2 -translate-y-1/2" onMouseDown={onGripMouseDown('southeast')} />)}
			{isShowGrip('south') && (<GripComp className="left-1/2 top-full -translate-x-1/2 -translate-y-1/2" gripContentClassName="w-[11px] h-[6px]" onMouseDown={onGripMouseDown('south')} />)}
			{isShowGrip('southwest') && (<GripComp className="left-0 top-full -translate-x-1/2 -translate-y-1/2" onMouseDown={onGripMouseDown('southwest')} />)}
			{isShowGrip('west') && (<GripComp className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" gripContentClassName="w-[6px] h-[11px]" onMouseDown={onGripMouseDown('west')} />)}
			{isShowGrip('northwest') && (<GripComp className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" onMouseDown={onGripMouseDown('northwest')} />)}
			{isShowGrip('north') && (<GripComp className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" gripContentClassName="w-[11px] h-[6px]" onMouseDown={onGripMouseDown('north')} />)}
			{isShowGrip('northeast') && (<GripComp className="left-full top-0 -translate-x-1/2 -translate-y-1/2" onMouseDown={onGripMouseDown('northeast')} />)}
		</div>
	)
}

