import { Navigate, createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/home/HomePage";
import StarWarsPage from "../pages/starwars/StarWarsPage";
import StarWarsDetailPage from "../pages/starwars/StarWarsDetailPage";


export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PublicLayout />
		),
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/starwars",
				element: <StarWarsPage />,
			},
			{
				path: "/starwars/:characterId",
				element: <StarWarsDetailPage />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);
