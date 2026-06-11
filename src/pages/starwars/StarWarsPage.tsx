import { Suspense, use } from "react";
import "./StarWarsPage.css";
import Spinner from "../../components/ui/Spinner";
// import { StarWarsContext } from "../../context/StarWarsContextProvider";
import StarWarsTable from "./ui/StarWarsTable";
import { getStarWarsCharacters } from "../../api/starwars";


// La promise se crea fuera del componente para evitar re-renders infinitos
const charactersPromise = getStarWarsCharacters();


function StarWarsPage() {

	// Mètode per rcuperar el Context únic la informació d'un estat
	// const { characters } = use(StarWarsContext);

	const characters = use(charactersPromise);


	return (
		<Suspense fallback={<Spinner />}>

			<StarWarsTable characters={characters} />
			
		</Suspense>
	);
}

export default StarWarsPage;