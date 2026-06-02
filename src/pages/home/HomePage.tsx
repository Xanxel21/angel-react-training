import { Suspense } from "react"
import Cover from "../../components/home/Cover"

function HomePage() {


	return (
		<>

			<Suspense fallback={<div>Loading...</div>}>
				<h1>React - Home Page</h1>

				<header>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/form">Formulari</a>
						</li>
					</ul>
				</header>
			</Suspense>

			<Cover
				title="Estem a la Home Page"
				description="Aquesta és la descripció de la pàgina d'inici."
				imageUrl="https://images.icon-icons.com/2699/PNG/512/reactjs_logo_icon_170805.png"
			/>


		</>
	)
}

export default HomePage
