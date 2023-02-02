import { useDesignStore } from "../../../stores/design";
import CanvasSetting from "./CanvasSetting";

export default function Right() {

	const canvas = useDesignStore(({isActiveBackground, getActiveComponents }) => ({ isActiveBackground, getActiveComponents }))

	return (
		<div className="w-[276px] absolute top-0 right-0 bottom-0">
			{(canvas.isActiveBackground || !canvas.getActiveComponents().length ) && <CanvasSetting />}
		</div>
	)
}