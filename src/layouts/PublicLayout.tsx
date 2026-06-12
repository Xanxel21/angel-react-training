import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import rebelLogo from "../assets/Rebel logo.png";
import empireLogo from "../assets/Empire logo.png";
import { StarWarsContext } from "../context/StarWarsContext";
import "../pages/starwars/StarWarsPage.css";

const PublicLayout = () => {
    const { theme, setTheme } = useContext(StarWarsContext);

    return (
        <div className={`starwars-page ${theme === "light" ? "theme-republic" : "theme-empire"}`}>
			<header className="starwars-nav">
				<div className="starwars-brand" aria-label="Holocron Academy">
					<span className="starwars-brand__icon">*</span>
					<div className="starwars-brand__text">
						<span>Holocron</span>
						<span>Academy</span>
					</div>
				</div>

				<div className="starwars-nav__right">
					<nav className="starwars-nav__links" aria-label="Navegacion principal">
						<NavLink to="/" className={({ isActive }) => (isActive ? "is-active" : "")}
							end>
							Inicio
						</NavLink>
						<NavLink to="/starwars" className={({ isActive }) => (isActive ? "is-active" : "")}> 
							Archivo Jedi
						</NavLink>
					</nav>

					<div className="starwars-theme-switch" role="group" aria-label="Selector de tema">
						<button
							type="button"
							className={`starwars-theme-switch__option ${theme === "light" ? "is-selected" : ""}`}
							onClick={() => setTheme("light")}
							aria-pressed={theme === "light"}
						>
							<img src={rebelLogo} alt="" aria-hidden="true" />
							<span>Republica</span>
						</button>
						<button
							type="button"
							className={`starwars-theme-switch__option ${theme === "dark" ? "is-selected" : ""}`}
							onClick={() => setTheme("dark")}
							aria-pressed={theme === "dark"}
						>
							<img src={empireLogo} alt="" aria-hidden="true" />
							<span>Imperio</span>
						</button>
					</div>
				</div>
			</header>

            <Outlet />

        </div>
    )
};

export default PublicLayout;