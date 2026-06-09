import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import type { IStarWarsCharacter } from "../../interfaces/IStarWarsCharacter";

interface StarWarsCharacterModalProps {
	open: boolean;
	character: IStarWarsCharacter | null;
	onClose: () => void;
}

const StarWarsCharacterModal = ({ open, character, onClose }: StarWarsCharacterModalProps) => {
	if (!character) {
		return null;
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>{character.name}</DialogTitle>
			<DialogContent>
				<Stack spacing={2} divider={<Divider flexItem />}>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Typography variant="overline" color="text.secondary">
								Altura
							</Typography>
							<Typography>{character.height}</Typography>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Typography variant="overline" color="text.secondary">
								Peso
							</Typography>
							<Typography>{character.mass}</Typography>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Typography variant="overline" color="text.secondary">
								Género
							</Typography>
							<Typography>{character.gender}</Typography>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Typography variant="overline" color="text.secondary">
								Nacimiento
							</Typography>
							<Typography>{character.birth_year}</Typography>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Typography variant="overline" color="text.secondary">
								Color de ojos
							</Typography>
							<Typography>{character.eye_color}</Typography>
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<Typography variant="overline" color="text.secondary">
								Color de pelo
							</Typography>
							<Typography>{character.hair_color}</Typography>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<Typography variant="overline" color="text.secondary">
								Color de piel
							</Typography>
							<Typography>{character.skin_color}</Typography>
						</Grid>
					</Grid>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default StarWarsCharacterModal;