import { BrowserRouter, useRoutes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Design from "../pages/Design";
import NotFound from "../pages/NotFound";

const App = () => {

	const element = useRoutes([
		{
			path: '/',
			element: <Dashboard />,
		},
		{
			path: 'design',
			element: <Design />
		},
		{
			path: '*',
			element: <NotFound />
		}
	])

	return element
}

export default function AppRoutes() {
	return <BrowserRouter><App /></BrowserRouter>
}