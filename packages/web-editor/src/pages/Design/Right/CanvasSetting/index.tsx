
export default function CanvasSetting() {
	return (
		<div>
			<h3 className="border-b-2 border-gray-100 h-[56px] leading-[56px] px-7 font-medium	 ">画布</h3>
			<div className="px-7">
				<div>
					<div>名称</div>
					<input />
				</div>
				<div>
					<div>页面标题</div>
					<input />
				</div>
				<div>
					<div>画布尺寸</div>
					<div className="flex">
						<div className="grow">
							<span>宽</span>
							<span>320px</span>
						</div>
						<div className="grow">
							<span>高</span>
							<span>568px</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}