import React, { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"))
const Design = React.lazy(() => import("../pages/Design"))

import NotFound from "../pages/NotFound";

const App = () => {

	const element = useRoutes([
		{
			path: '/',
			element: <Suspense fallback={<div>loading</div>}><Home /></Suspense>,
		},
		{
			path: 'design',
			element: <Suspense fallback={<div>loading</div>}><Design /></Suspense>
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