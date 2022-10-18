import { componentsClass } from "./componentTypes";

export default function Left() {
	return (
		<div className="flex h-full justify-between w-[65px] text-center absolute top-0 left-0 bottom-0 bg-lime-300">
			<div className="w-full">
				<div className="flex flex-col">
					{
						componentsClass.map(item => (
							<div key={item.type} className=" pt-[14px] pb-[14px] cursor-pointer" >
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