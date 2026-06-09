import { Navigate, createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/home/HomePage";
import FormPage from "../pages/form/FormPage";
import StarWarsPage from "../pages/starwars/StarWarsPage";


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
				path: "/form",
				element: <FormPage />,
			},
			{
				path: "/starwars",
				element: <StarWarsPage />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);
