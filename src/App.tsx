import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { StarWarsContextProvider } from "./context/StarWarsContextProvider";


const App: React.FC = () => {
  return (
    <StarWarsContextProvider>
      <RouterProvider router={router} />;
    </StarWarsContextProvider>
  )
};

export default App;
