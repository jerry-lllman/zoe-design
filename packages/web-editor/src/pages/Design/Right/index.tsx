import { useCanvasByContext } from "../store/hooks";
import CanvasSetting from "./CanvasSetting";

export default function Right() {

	const canvas = useCanvasByContext()

	return (
		<div className="w-[276px] absolute top-0 right-0 bottom-0">
			{canvas.getIsActiveBackground() && <CanvasSetting />}
		</div>
	)
}