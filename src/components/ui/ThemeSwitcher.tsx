import { useContext } from "react";
import rebelLogo from "../../assets/Rebel logo.png";
import empireLogo from "../../assets/Empire logo.png";
import { StarWarsContext } from "../../context/StarWarsContext";

function ThemeSwitcher() {
	const { theme, setTheme } = useContext(StarWarsContext);

	return (
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
	);
}

export default ThemeSwitcher;