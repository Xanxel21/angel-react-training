import { Navigate, createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/home/HomePage";
import StarWarsPage from "../pages/starwars/StarWarsPage";
import StarWarsDetailPage from "../pages/starwars/StarWarsDetailPage";
import FavouritesForm from "../pages/favourites/FavouritesForm";


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
			{
				path: "/form",
				element: <FavouritesForm />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);
