import { Link } from "react-router-dom";

export default function NotFound() {

	return (
		<div>
			<div>Not Found</div>
			<div><Link to="/" >回到首页</Link></div>
		</div>
	)
}