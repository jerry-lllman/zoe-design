import classNames from 'classnames'
import styles from './index.module.less'
import useDragBlockStore from './store'


export default function DragBlock(props: any) {
	const { dragBlockInfo } = props
	const editorGrip = classNames('absolute top-0 left-0 p-[4px] -translate-x-1/2 -translate-y-1/2', styles.editorGrip)

	const { onMouseDown } = useDragBlockStore()

	return (
		<div
			className="absolute before:absolute before:w-full before:h-full before:border-dotted before:border-2 before:border-cyan-300"
			style={dragBlockInfo.style}
			onMouseDown={onMouseDown}
		>
			<i className={editorGrip}>
				<b className="block w-[10px] h-[10px] rounded-full bg-white"></b>
			</i>
		</div>
	)
}