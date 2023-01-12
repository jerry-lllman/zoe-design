import TextLib from "./TextLib";
import ImgLib from "./ImgLib";
import { useContext } from "react";
import { LeftContext } from "../store/Context";

const libs = [TextLib, ImgLib]

export default function LeftExpand() {

	const leftContextValue = useContext(LeftContext)

	return (
		<div className="w-[328px] absolute z-10 top-0 bottom-0 left-[65px]">
			{
				libs[leftContextValue.leftActiveKey]()
			}
		</div>
	)
}