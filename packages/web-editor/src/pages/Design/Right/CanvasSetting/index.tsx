import { Button, InputNumber, message, Upload } from "antd";
import ColorPicker from "../../../../components/ColorPicker";
import { useDesignStore } from "../../../../stores/design";

export default function CanvasSetting() {

	const canvas = useDesignStore(({
		canvasData,
		isActiveBackground,
		setCanvasBaseInfo
	}) => ({
		canvasData,
		isActiveBackground,
		setCanvasBaseInfo
	}))


	const { style } = canvas.canvasData


	return (
		<div>
			<h3 className="border-b-2 border-gray-100 h-[56px] leading-[56px] px-7 font-medium	 ">画布</h3>
			<div className="px-7">

				<div className="my-7">
					<div className="mb-4 text-gray-500">尺寸</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<InputNumber
								min={1}
								size="large"
								addonBefore="宽"
								value={style.width}
								onChange={(width: number) => canvas.setCanvasBaseInfo({ style: { width } })}
							/>
						</div>
						<div>
							<InputNumber
								min={1}
								size="large"
								addonBefore="高"
								value={style.height}
							onChange={(height: number) => canvas.setCanvasBaseInfo({ style: { height } })}
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="mb-4 text-gray-500">背景</div>
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="mb-2">背景色</div>
						<ColorPicker
							color={style.backgroundColor}
							onChange={(backgroundColor) => canvas.setCanvasBaseInfo({ style: { backgroundColor } })}
						/>
					</div>
					{/* <Upload> */}
						<Button className="w-full mt-4" onClick={() => message.warning('功能正在开发中～')}>上传背景图片</Button>
					{/* </Upload> */}
				</div>
			</div>
		</div>
	)
}