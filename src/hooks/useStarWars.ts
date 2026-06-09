import { useEffect, useState } from "react";
import { getStarWarsCharacters } from "../api/starwars";
import type { IStarWarsCharacter } from "../interfaces/IStarWarsCharacter";

export const useStarWars = () => {
	const [characters, setCharacters] = useState<IStarWarsCharacter[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadCharacters = async () => {
			try {
				setIsLoading(true);
				const response = await getStarWarsCharacters();
				if(response) setCharacters(response);
				
			} catch (caughtError) {
				setError(caughtError instanceof Error ? caughtError.message : "Ha ocurrido un error inesperado.");
			} finally {
				setIsLoading(false);
			}
		};

		loadCharacters();

	}, []);

	return { characters, setCharacters, isLoading, error };
};