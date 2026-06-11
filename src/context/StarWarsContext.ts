import { createContext, Dispatch, SetStateAction } from "react";
import { IStarWarsCharacter } from "../interfaces/IStarWarsCharacter";

export type ThemeType = "light" | "dark";

export interface StarWarsContextProps {
	characters: IStarWarsCharacter[];
	setCharacters: Dispatch<SetStateAction<IStarWarsCharacter[]>>;
	theme: ThemeType;
	setTheme: Dispatch<SetStateAction<ThemeType>>;
	handleCharacters: (chars: IStarWarsCharacter[]) => void;
}

export const StarWarsContext = createContext<StarWarsContextProps>({} as StarWarsContextProps);