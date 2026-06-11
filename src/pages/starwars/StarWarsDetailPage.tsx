import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	Alert,
	Box,
	Button,
	Chip,
	CircularProgress,
	Container,
	Typography,
} from "@mui/material";
import { getStarWarsCharacters } from "../../api/starwars";
import type { IStarWarsCharacter } from "../../interfaces/IStarWarsCharacter";
import "./StarWarsDetailPage.css";

type LocationState = {
	character?: IStarWarsCharacter;
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

const normalizeValue = (value: string) => {
	if (!value || value.toLowerCase() === "unknown" || value.toLowerCase() === "n/a") {
		return "Desconocido";
	}

	return value;
};

const getCharacterIdFromUrl = (url: string) => {
	const match = url.match(/\/(\d+)\/?$/);
	return match?.[1] ?? null;
};

function StarWarsDetailPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { characterId } = useParams();
	const locationState = location.state as LocationState | null;
	const [character, setCharacter] = useState<IStarWarsCharacter | null>(locationState?.character ?? null);
	const [isLoading, setIsLoading] = useState(!locationState?.character && !!characterId);
	const [error, setError] = useState<string | null>(
		!locationState?.character && !characterId
			? "No se ha encontrado el identificador del personaje."
			: null,
	);

	const genderLabel = useMemo(() => {
		if (!character) {
			return "Desconocido";
		}

		return toGenderLabel(character.gender);
	}, [character]);

	useEffect(() => {
		if (character || !characterId) {
			return;
		}

		const loadCharacter = async () => {
			try {
				setIsLoading(true);
				const allCharacters = await getStarWarsCharacters();
				const foundCharacter = allCharacters.find(
					(item) => getCharacterIdFromUrl(item.url) === characterId,
				);

				if (!foundCharacter) {
					setError("No se ha encontrado el personaje solicitado.");
					return;
				}

				setCharacter(foundCharacter);
			} catch (caughtError) {
				setError(caughtError instanceof Error ? caughtError.message : "Ha ocurrido un error inesperado.");
			} finally {
				setIsLoading(false);
			}
		};

		loadCharacter();
	}, [character, characterId]);

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
		<Container maxWidth="md" className="starwars-detail-page">
			<Button variant="text" onClick={() => navigate("/starwars")} className="starwars-detail-back">
				← Volver al archivo
			</Button>

			{error ? <Alert severity="error">{error}</Alert> : null}

			{character ? (
				<div className="starwars-detail-card">
					<div className="starwars-detail-hero">
						<div className="starwars-detail-avatar" aria-hidden="true">◉</div>
						<div>
							<Typography component="h1" className="starwars-detail-name">
								{character.name}
							</Typography>
							<div className="starwars-detail-tags">
								<Chip label={genderLabel} size="small" className="starwars-detail-chip" />
								<Chip
									label={`Nacimiento: ${normalizeValue(character.birth_year)}`}
									size="small"
									className="starwars-detail-chip starwars-detail-chip--gold"
								/>
							</div>
						</div>
					</div>

					<section className="starwars-detail-section">
						<Typography component="h2" className="starwars-detail-section-title">
							Caracteristicas fisicas
						</Typography>
						<Box className="starwars-detail-grid">
							<div className="starwars-detail-item">
								<Typography className="starwars-detail-item-label">Altura</Typography>
								<Typography className="starwars-detail-item-value">{normalizeValue(character.height)} cm</Typography>
							</div>
							<div className="starwars-detail-item">
								<Typography className="starwars-detail-item-label">Masa</Typography>
								<Typography className="starwars-detail-item-value">{normalizeValue(character.mass)} kg</Typography>
							</div>
							<div className="starwars-detail-item">
								<Typography className="starwars-detail-item-label">Ojos</Typography>
								<Typography className="starwars-detail-item-value">{normalizeValue(character.eye_color)}</Typography>
							</div>
							<div className="starwars-detail-item">
								<Typography className="starwars-detail-item-label">Cabello</Typography>
								<Typography className="starwars-detail-item-value">{normalizeValue(character.hair_color)}</Typography>
							</div>
							<div className="starwars-detail-item">
								<Typography className="starwars-detail-item-label">Piel</Typography>
								<Typography className="starwars-detail-item-value">{normalizeValue(character.skin_color)}</Typography>
							</div>
							<div className="starwars-detail-item">
								<Typography className="starwars-detail-item-label">Nacimiento</Typography>
								<Typography className="starwars-detail-item-value">{normalizeValue(character.birth_year)}</Typography>
							</div>
						</Box>
					</section>
				</div>
			) : null}
		</Container>
	);
}

export default StarWarsDetailPage;
