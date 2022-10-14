
export default function Header() {
	return (
		<div className="flex w-full justify-between items-center h-[54px] bg-red-400">
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