import { Suspense, use, useEffect } from "react";
import "./StarWarsPage.css";
import Spinner from "../../components/ui/Spinner";
import { StarWarsContext } from "../../context/StarWarsContext";
import StarWarsTable from "./ui/StarWarsTable";
import { getStarWarsCharacters } from "../../api/starwars";

const charactersPromise = getStarWarsCharacters();

function StarWarsPage() {
	const { characters, setCharacters } = use(StarWarsContext);
	const loadedCharacters = use(charactersPromise);

	useEffect(() => {
		if (characters.length === 0) {
			setCharacters(loadedCharacters);
		}
	}, [characters.length, loadedCharacters, setCharacters]);


	return (
		<Suspense fallback={<Spinner />}>
			<StarWarsTable />
		</Suspense>
	);
}

export default StarWarsPage;