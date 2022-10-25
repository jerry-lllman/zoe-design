import classNames from 'classnames'
import GripComp from './GripComp'
import useDragBlockStore from './store'


export default function DragBlock() {
	const { dragBlockInfo, onMouseDown } = useDragBlockStore()

	if (dragBlockInfo.blockStatus === 'hide') return null

	const { east, southeast, south, southwest, west, northwest, north, northeast } = dragBlockInfo.grips

	const blockClass = classNames(
		'absolute z-50 before:absolute before:w-full before:h-full before:border-dotted before:border-2 before:border-cyan-300',
		dragBlockInfo.blockStatus === 'moving' && 'before:border-1 before:border-cyan-100'
	)

	return (
		<div
			className={blockClass}
			style={dragBlockInfo.style}
			onMouseDown={onMouseDown}
		>
			{
				dragBlockInfo.blockStatus === 'static' && (
					<>
						{east && (<GripComp className="left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-" gripContentClassName="w-[6px] h-[11px]" />)}
						{southeast && (<GripComp className="left-full top-full -translate-x-1/2 -translate-y-1/2" />)}
						{south && (<GripComp className="left-1/2 top-full -translate-x-1/2 -translate-y-1/2" gripContentClassName="w-[11px] h-[6px]" />)}
						{southwest && (<GripComp className="left-0 top-full -translate-x-1/2 -translate-y-1/2" />)}
						{west && (<GripComp className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" gripContentClassName="w-[6px] h-[11px]" />)}
						{northwest && (<GripComp className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />)}
						{north && (<GripComp className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" gripContentClassName="w-[11px] h-[6px]" />)}
						{northeast && (<GripComp className="left-full top-0 -translate-x-1/2 -translate-y-1/2" />)}
					</>
				)
			}
		</div>
	)
}

