import { useMemo, useState } from "react";
import {
	Alert,
	Box,
	FormControl,
	MenuItem,
	Container,
	Paper,
	Select,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	CircularProgress,
	Button,
	InputAdornment,
	Chip,
} from "@mui/material";
import { useStarWars } from "../../hooks/useStarWars";
import type { IStarWarsCharacter } from "../../interfaces/IStarWarsCharacter";
import StarWarsCharacterModal from "../../components/starwars/StarWarsCharacterModal";
import "./StarWarsPage.css";

type CharacterGenderFilter = "all" | "male" | "female" | "other";

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

const toGenderLabel = (gender: string) => {
	const normalizedGender = gender.toLowerCase();

	if (normalizedGender === "male") {
		return "Masculino";
	}

	if (normalizedGender === "female") {
		return "Femenino";
	}

	return "Desconocido";
};

function StarWarsPage() {
	const { characters, setCharacters, isLoading, error } = useStarWars();
	const [selectedCharacter, setSelectedCharacter] = useState<IStarWarsCharacter | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [genderFilter, setGenderFilter] = useState<CharacterGenderFilter>("all");
	const [eyeColorFilter, setEyeColorFilter] = useState("all");

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

	const handleOpenModal = (character: IStarWarsCharacter) => {
		setSelectedCharacter(character);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCharacter(null);
	};

	const resetFilters = () => {
		setSearchTerm("");
		setGenderFilter("all");
		setEyeColorFilter("all");
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					minHeight: "100svh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}>
				<Box className="starwars-title-block">
					<Typography component="p" className="starwars-kicker">
						BASE DE DATOS GALACTICA
					</Typography>
					<Typography component="h1" className="starwars-title">
						Archivo Jedi
					</Typography>
					<Typography component="p" className="starwars-subtitle">
						Filtra, ordena y explora todos los personajes de la galaxia. Selecciona cualquier fila para
						 ver su ficha completa.
					</Typography>
				</Box>

				{error ? <Alert severity="error">{error}</Alert> : null}

				<Paper className="starwars-filter-card" elevation={0}>
					<div className="starwars-filter-grid">
						<TextField
							placeholder="Buscar personaje..."
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							fullWidth
							className="starwars-input"
							slotProps={{
								input: {
									startAdornment: <InputAdornment position="start">Q</InputAdornment>,
								},
							}}
						/>

						<FormControl fullWidth className="starwars-input">
							<Select
								displayEmpty
								value={genderFilter}
								onChange={(event) => setGenderFilter(event.target.value as CharacterGenderFilter)}
							>
								<MenuItem value="all">Genero - Todos</MenuItem>
								<MenuItem value="male">Masculino</MenuItem>
								<MenuItem value="female">Femenino</MenuItem>
								<MenuItem value="other">Otro</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth className="starwars-input">
							<Select
								displayEmpty
								value={eyeColorFilter}
								onChange={(event) => setEyeColorFilter(event.target.value)}
							>
								<MenuItem value="all">Color de ojos - Todos</MenuItem>
								{eyeColorOptions.map((eyeColor) => (
									<MenuItem value={eyeColor} key={eyeColor}>
										{eyeColor}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<Button variant="text" className="starwars-clear" onClick={resetFilters}>
							Limpiar
						</Button>
					</div>

					<Typography component="p" className="starwars-total">
						{filteredCharacters.length} personajes en el archivo
					</Typography>
				</Paper>

				<TableContainer component={Paper} className="starwars-table-wrap" elevation={0}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Personaje ^</TableCell>
								<TableCell>Genero</TableCell>
								<TableCell>Color de ojos</TableCell>
								<TableCell align="right">Altura (cm)</TableCell>
								<TableCell align="right">Masa (kg)</TableCell>
								<TableCell>Nacimiento</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{filteredCharacters.map((character) => {
								const genderLabel = toGenderLabel(character.gender);

								return (
									<TableRow
										key={character.url}
										hover
										onClick={() => handleOpenModal(character)}
										className="starwars-row"
									>
										<TableCell className="starwars-name-cell">
											<span className="starwars-avatar" aria-hidden="true">
												::
											</span>
											{character.name}
										</TableCell>
										<TableCell>
											<Chip
												label={genderLabel}
												size="small"
												className={
													genderLabel === "Femenino"
														? "starwars-chip starwars-chip--female"
														: "starwars-chip starwars-chip--male"
												}
											/>
										</TableCell>
										<TableCell>{normalizeValue(character.eye_color)}</TableCell>
										<TableCell align="right">{normalizeValue(character.height)}</TableCell>
										<TableCell align="right">{normalizeValue(character.mass)}</TableCell>
										<TableCell>{normalizeValue(character.birth_year)}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			<StarWarsCharacterModal
				open={isModalOpen}
				character={selectedCharacter}
				onClose={handleCloseModal}
			/>
		</>
	);
}

export default StarWarsPage;