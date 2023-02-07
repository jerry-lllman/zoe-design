import { Skeleton } from "antd";
import React, { Suspense } from "react";
import { useDesignStore } from "../../../stores/design";
import { ComponentType } from "../LeftExpand/typing";
const CanvasSetting = React.lazy(() => import("./CanvasSetting"));
const TextSetting = React.lazy(() => import("./TextSetting"))

const renderSetting = {
	canvas: () => <CanvasSetting />,
	group: () => <div>group</div>,
	text: () => <TextSetting />,
	image: ()=> <div>image</div>
}

type SettingType = 'canvas' | 'group' | ComponentType["type"]

export default function Right() {

	const canvas = useDesignStore(({ getActiveComponents }) => ({ getActiveComponents }))

	let type: SettingType = 'canvas'

	const components = canvas.getActiveComponents()

	if (components.length > 1) {
		type = 'group'
	} else if (components.length === 1) {
		type = components[0].type
	}


	return (
		<div className="w-[276px] absolute top-0 right-0 bottom-0">
			<Suspense fallback={<Skeleton />}>
				{renderSetting[type]()}
			</Suspense>
		</div>
	)
}