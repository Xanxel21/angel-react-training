import "./HomePage.css";

function HomePage() {
	return (
		<div className="home-page">
			<main className="home-hero">
				<p className="home-chip">Una galaxia muy, muy lejana - powered by SWAPI</p>

				<h1>
					Holocron
					<br />
					Academy
				</h1>

				<h2>Domina React explorando el archivo de personajes de Star Wars</h2>

				<p className="home-description">
					Un proyecto de formacion construido con React, Material UI y la API publica SWAPI.
					Aprende fetching de datos, filtrado y arquitectura de componentes mientras recorres
					la galaxia.
				</p>
			</main>
		</div>
	);
}

export default HomePage;
