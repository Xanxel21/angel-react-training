import {
  createBrowserRouter,
	Navigate,
} from "react-router"; 
import FormPage from "../pages/form/FormPage";
import HomePage from "../pages/home/HomePage";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/form",
		element: <FormPage />,
	},
	 {
    path: '*',
    element: <Navigate to="/" />,
  },
])