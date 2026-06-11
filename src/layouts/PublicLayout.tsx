import { NavLink, Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="starwars-page">
			<header className="starwars-nav">
				<div className="starwars-brand" aria-label="Holocron Academy">
					<span className="starwars-brand__icon">*</span>
					<div className="starwars-brand__text">
						<span>Holocron</span>
						<span>Academy</span>
					</div>
				</div>

				<nav className="starwars-nav__links" aria-label="Navegacion principal">
					<NavLink to="/" className={({ isActive }) => (isActive ? "is-active" : "")}
						end>
						Inicio
					</NavLink>
					<NavLink to="/starwars" className={({ isActive }) => (isActive ? "is-active" : "")}>
						Archivo Jedi
					</NavLink>
				</nav>
			</header>

            <Outlet />

        </div>
    )
};

export default PublicLayout;