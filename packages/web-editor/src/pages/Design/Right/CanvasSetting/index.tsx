
export default function CanvasSetting() {
	return (
		<div>
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
	)
}