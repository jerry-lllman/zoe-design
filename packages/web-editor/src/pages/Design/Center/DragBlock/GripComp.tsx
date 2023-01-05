import classNames from 'classnames'
import styles from './index.module.less'

interface BaseGripCompProps {
	gripContentClassName?: string
	onMouseDown: React.MouseEventHandler<HTMLElement> 
}

export default function GripComp(props: React.HTMLAttributes<HTMLElement> & BaseGripCompProps) {

	const { className, style, gripContentClassName, onMouseDown } = props

	const gripWrapperClass = classNames('absolute ', className, styles.editor_grip)

	const gripContentClass = classNames('block w-[10px] h-[10px] rounded-full bg-white', gripContentClassName)


	return (
		<i className={gripWrapperClass} style={style} onMouseDown={onMouseDown}>
			<b className={gripContentClass}></b>
		</i>
	)
}