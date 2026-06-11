import { createContext, PropsWithChildren, useState, Dispatch, SetStateAction } from "react";
import { IStarWarsCharacter } from "../interfaces/IStarWarsCharacter";

type ThemeType = 'light' | 'dark'

interface StarWarsContextProps {
    characters: IStarWarsCharacter[];
    setCharacters: Dispatch<SetStateAction<IStarWarsCharacter[]>>;
    theme: ThemeType;
    setTheme:  Dispatch<SetStateAction<ThemeType>>;
    handleCharacters: ( chars: IStarWarsCharacter[] ) => void;
}

export const StarWarsContext = createContext<StarWarsContextProps>(null);

export const StarWarsContextProvider = ({ children }: PropsWithChildren) => {
    const [ characters, setCharacters ] = useState<IStarWarsCharacter[]>(null);
    const [ theme , setTheme ] = useState<ThemeType>(() => {
        const storedTheme = localStorage.getItem('SWTheme');
        return storedTheme;
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