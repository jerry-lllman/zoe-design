import { useCanvasByContext } from "../store/hooks"

export default function Header() {
	const canvas = useCanvasByContext()

	const title =  canvas.getCanvas().title

	return (
		<div className="flex w-full justify-between items-center h-[54px] border-b border-slate-200 px-7">
			<div>
				<span>Zoe</span>
				<span>{title}</span>
				{/* 等 */}
			</div>
			<div>
				<button>保存</button>
				<button>发布</button>
			</div>
		</div>
	)
}