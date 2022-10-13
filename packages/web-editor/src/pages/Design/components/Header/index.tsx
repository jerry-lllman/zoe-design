
export default function Header() {
	return (
		<div className=" fixed flex w-full justify-between">
			<div>
				<span>Zoe</span>
				<span>标题</span>
				{/* 等 */}
			</div>
			<div>
				<button>保存</button>
				<button>发布</button>
			</div>
		</div>
	)
}