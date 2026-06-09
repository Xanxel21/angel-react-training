import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
	return (
		<div className="home-page">
			<header className="home-nav">
				<div className="home-brand" aria-label="Holocron Academy">
					<span className="home-brand__icon">*</span>
					<div className="home-brand__text">
						<span>Holocron</span>
						<span>Academy</span>
					</div>
				</div>

				<nav className="home-nav__links" aria-label="Navegacion principal">
					<Link to="/" className="is-active">
						Inicio
					</Link>
					<Link to="/starwars">Archivo Jedi</Link>
				</nav>
			</header>

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
