import { useContext } from "react";
import { LeftContext } from "../store/Context";
import { useCanvasByContext } from "../store/hooks";
import { componentsClass } from "./componentTypes";

export default function Left() {

	const leftContextValue = useContext(LeftContext)

	console.log(leftContextValue.leftActiveKey)

	return (
		<div className="flex h-full justify-between w-[65px] text-center absolute top-0 left-0 bottom-0 bg-lime-300">
			<div className="w-full">
				<div className="flex flex-col">
					{
						componentsClass.map(item => (
							<div
								key={item.type}
								className=" pt-[14px] pb-[14px] cursor-pointer"
								style={{ backgroundColor: leftContextValue.leftActiveKey === item.type ? '#1890ff' : '#fff' }}
								onClick={() => leftContextValue.setLeftActiveKey(item.type)}
							>
								<span>{item.title}{item.type}</span>
							</div>
						))
					}
				</div>
			</div>
			<div></div>
		</div>
	)
}