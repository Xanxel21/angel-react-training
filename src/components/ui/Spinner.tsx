import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
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
	)
}
