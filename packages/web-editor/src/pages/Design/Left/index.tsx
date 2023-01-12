import { useContext } from "react";
import classNames from "classnames";
import { LeftContext } from "../store/Context";
import { componentsClass } from "./componentTypes";
import './index.less'

export default function Left() {

	const leftContextValue = useContext(LeftContext)

	const itemClass = (isActive: boolean) => classNames(
		'mt-4 py-4 cursor-pointer relative component-block__hovered',
		isActive && ['component-block__lighting', 'text-blue-600']
	)

	return (
		<div className="flex h-full justify-between w-[65px] text-center absolute top-0 left-0 bottom-0 border-r border-slate-200">
			<div className="w-full">
				<div className="flex flex-col">
					{
						componentsClass.map(item => (
							<div
								key={item.type}
								className={itemClass(leftContextValue.leftActiveKey === item.type)}
								onClick={() => leftContextValue.setLeftActiveKey(item.type)}
							>
								<span>{item.title}</span>
							</div>
						))
					}
				</div>
			</div>
			<div></div>
		</div>
	)
}