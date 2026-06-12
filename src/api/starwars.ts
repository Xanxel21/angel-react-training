import { IStarWarsCharacter } from "../interfaces/IStarWarsCharacter";

export const getStarWarsCharacters = async (): Promise<IStarWarsCharacter[]> => {
	const response = await fetch("https://swapi.info/api/people");

	if (!response.ok) {
		throw new Error("No se ha podido cargar la información de Star Wars.");
	}

	return (await response.json()) as IStarWarsCharacter[];
};

export const getStarWarsCharacterById = async (id: number): Promise<IStarWarsCharacter> => {
	const response = await fetch(`https://swapi.info/api/people/${id}`);

	if (!response.ok) {
		throw new Error("No se ha podido cargar la información del personaje de Star Wars.");
	}

	return (await response.json()) as IStarWarsCharacter;
};