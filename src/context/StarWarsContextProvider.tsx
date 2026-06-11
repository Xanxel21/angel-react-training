import { PropsWithChildren, useState } from "react";
import { IStarWarsCharacter } from "../interfaces/IStarWarsCharacter";
import { StarWarsContext, ThemeType } from "./StarWarsContext";

export const StarWarsContextProvider = ({ children }: PropsWithChildren) => {
    const [ characters, setCharacters ] = useState<IStarWarsCharacter[]>([]);
    const [ theme , setTheme ] = useState<ThemeType>(() => {
        const storedTheme = localStorage.getItem('SWTheme');
        return (storedTheme as ThemeType) || 'light';
    })

    const handleCharacters = ( chars: IStarWarsCharacter[] ) => {
        setCharacters(chars);
    }

    return (
        <StarWarsContext.Provider
        value={{
            characters,
            setCharacters,
            theme,
            setTheme,
            handleCharacters
        }}
        >
            {children}
        </StarWarsContext.Provider>

    )
}