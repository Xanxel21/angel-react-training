import { useEffect, useState, useMemo } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import { getStarWarsCharacters } from "../api/starwars";
import { IStarWarsCharacter } from "../interfaces/IStarWarsCharacter";

type CharacterGenderFilter = "all" | "male" | "female" | "other";

export const useStarWars = () => {
	const [characters, setCharacters] = useState<IStarWarsCharacter[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [genderFilter, setGenderFilter] = useState<CharacterGenderFilter>("all");
	const [eyeColorFilter, setEyeColorFilter] = useState("all");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const normalizeValue = (value: string) => {
		if (!value || value.toLowerCase() === "unknown" || value.toLowerCase() === "n/a") {
			return "Desconocido";
		}

		return value;
	};

	const toGenderFilter = (gender: string): CharacterGenderFilter => {
		const normalizedGender = gender.toLowerCase();

		if (normalizedGender === "male") {
			return "male";
		}

		if (normalizedGender === "female") {
			return "female";
		}

		return "other";
	};

	const eyeColorOptions = useMemo(() => {
		const values = new Set<string>();

		characters.forEach((character) => {
			values.add(normalizeValue(character.eye_color));
		});

		return Array.from(values).sort((a, b) => a.localeCompare(b));
	}, [characters]);

	const filteredCharacters = useMemo(() => {
		const normalizedTerm = searchTerm.trim().toLowerCase();

		return [...characters]
			.filter((character) => {
				if (!normalizedTerm) {
					return true;
				}

				return character.name.toLowerCase().includes(normalizedTerm);
			})
			.filter((character) => {
				if (genderFilter === "all") {
					return true;
				}

				return toGenderFilter(character.gender) === genderFilter;
			})
			.filter((character) => {
				if (eyeColorFilter === "all") {
					return true;
				}

				return normalizeValue(character.eye_color) === eyeColorFilter;
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [characters, eyeColorFilter, genderFilter, searchTerm]);

	const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleGenderfilter = (event: SelectChangeEvent) => {
		setGenderFilter(event.target.value as CharacterGenderFilter);
	};

	const handleEyeColor = (event: SelectChangeEvent) => {
		setEyeColorFilter(event.target.value as string);
	};

	const resetFilters = () => {
		setSearchTerm("");
		setGenderFilter("all");
		setEyeColorFilter("all");
	};

	useEffect(() => {
		const loadCharacters = async () => {
			try {
				setIsLoading(true);
				const response = await getStarWarsCharacters();
				if (response) {
					setCharacters(response);
				}
			} catch (caughtError) {
				setError(caughtError instanceof Error ? caughtError.message : "Ha ocurrido un error inesperado.");
			} finally {
				setIsLoading(false);
			}
		};

		loadCharacters();

	}, []);

	return {
		characters,
		searchTerm,
		genderFilter,
		eyeColorFilter,
		eyeColorOptions,
		filteredCharacters,
		normalizeValue,
		handleSearchTerm,
		handleGenderfilter,
		handleEyeColor,
		resetFilters,
		isLoading,
		error,
	};
};