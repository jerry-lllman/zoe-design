import classNames from 'classnames'
import styles from './index.module.less'

interface BaseGripCompProps {
	gripContentClassName?: string
}

export default function GripComp (props: React.HTMLAttributes<HTMLElement> & BaseGripCompProps) {

	const { className, style, gripContentClassName } = props

	const gripWrapperClass = classNames('absolute ', className, styles.editorGrip)

	const gripContentClass = classNames('block w-[10px] h-[10px] rounded-full bg-white', gripContentClassName)

	return (<i className={gripWrapperClass} style={style}>
		<b className={gripContentClass}></b>
	</i>)
}