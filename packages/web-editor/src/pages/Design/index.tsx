import Header from "./components/Header";

export default function Design() {

  const test = (e: React.MouseEvent) => {
    console.log(e)
  }

	return (
		<div className="flex flex-col min-w-[1024px] overflow-x-auto h-screen">
			<Header />
			<div className="workbench-body flex-1 flex relative">
				{/* 左边分类栏 */}
				<div className="flex h-full justify-between w-[65px] bg-lime-300">
					<div className="">
						<div>
							<button className="w-full pt-[12px] pb-[12px]">1</button>
							<button className="w-full pt-[12px] pb-[12px]">2</button>
						</div>
					</div>
					<div></div>
				</div>
				{/* 左边素材栏 */}
				<div className="w-[368px] absolute z-10 top-0 bottom-0 left-[64px] bg-emerald-100 hidden">

				</div>
				{/* 中间画布栏 */}
				<div className="flex-1 bg-neutral-400">
						<iframe src="http://localhost:5174/" frameBorder="0" width="100%" height="100%" allowFullScreen></iframe>
				</div>
				{/* 右边设置栏 */}
				<div className="w-[300px] h-full bg-fuchsia-300">

				</div>
			</div>
		</div>
	)
}