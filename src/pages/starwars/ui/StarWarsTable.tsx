import { 
	Container, 
	Box, 
	Typography, 
	Paper, 
	TextField, 
	InputAdornment, 
	FormControl, 
	Select, 
	MenuItem, 
	Button, 
	TableContainer, 
	Table, 
	TableHead, 
	TableRow, 
	TableCell, 
	TableBody, 
	Chip 
} from '@mui/material';
import { useStarWars } from '../../../hooks/useStarWars';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

export default function StarWarsTable() {
	const navigate = useNavigate();
	const {
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
	} = useStarWars();

	const characterIdByUrl = useMemo(() => {
		const map = new Map<string, string>();

		filteredCharacters.forEach((character) => {
			const match = character.url.match(/\/(\d+)\/?$/);
			if (match?.[1]) {
				map.set(character.url, match[1]);
			}
		});

		return map;
	}, [filteredCharacters]);

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

	const getCharacterInitials = (name: string) => {
		const words = name
			.trim()
			.split(/\s+/)
			.filter(Boolean);

		if (words.length === 0) {
			return "?";
		}

		if (words.length === 1) {
			return words[0].charAt(0).toUpperCase();
		}

		return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
	};


	return (
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

			<Paper className="starwars-filter-card" elevation={0}>
				<div className="starwars-filter-grid">
					<TextField
						placeholder="Buscar personaje..."
						value={searchTerm}
						onChange={handleSearchTerm}
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
							onChange={handleGenderfilter}
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
							onChange={handleEyeColor}
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
							<TableCell align="right">Acciones</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{filteredCharacters.map((character) => {
							const genderLabel = toGenderLabel(character.gender);
							const characterId = characterIdByUrl.get(character.url);
							const characterInitials = getCharacterInitials(character.name);

							return (
								<TableRow
									key={character.url}
									hover
									className="starwars-row"
								>
									<TableCell className="starwars-name-cell">
										<span className="starwars-avatar" aria-hidden="true">
											{characterInitials}
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
									<TableCell align="right">
										<Button
											variant="outlined"
											size="small"
											disabled={!characterId}
											onClick={() => {
												if (!characterId) {
													return;
												}

												navigate(`/starwars/${characterId}`, {
													state: { character },
												});
											}}
										>
											Ver detalle
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}
