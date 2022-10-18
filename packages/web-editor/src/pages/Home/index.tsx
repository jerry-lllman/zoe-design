
import { useNavigate } from "react-router-dom"
import Header from "./components/Header";

export default function Home() {

	const navigate = useNavigate();

	const created = () => {
		navigate('/design')
	}

	return (
		<div>
			<Header />
			<div>
				<button className="" onClick={created}>创建</button>
			</div>
		</div>
	)
}