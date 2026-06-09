import { Link, Outlet } from "react-router-dom";

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
					<Link to="/">Inicio</Link>
					<Link to="/starwars" className="is-active">
						Archivo Jedi
					</Link>
				</nav>
			</header>

            <Outlet />

        </div>
    )
};

export default PublicLayout;