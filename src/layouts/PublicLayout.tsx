import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { StarWarsContext } from "../context/StarWarsContext";
import ThemeSwitcher from "../components/ui/ThemeSwitcher";
import "../pages/starwars/StarWarsPage.css";

const PublicLayout = () => {
	const { theme } = useContext(StarWarsContext);

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
					<ThemeSwitcher />
				</div>
			</header>

            <Outlet />

        </div>
    )
};

export default PublicLayout;