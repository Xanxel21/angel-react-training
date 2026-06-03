import { useEffect, useState } from "react";
import { getUsers } from "../../api/users";
import UserInfo from "../../components/users/UserInfo";
import { IUser } from "../../interfaces/IUser";

function HomePage() {
	const [users, setUsers] = useState<IUser[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);


	useEffect(() => {
		const loadUsers = async () => {
			const response = await getUsers();
			setUsers(response);
			setIsLoading(false);
		};

		loadUsers();
	}, []);

	if (isLoading) return <div>Loading...</div>
	return (
		<>

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

			{users.map((user) => (
				<UserInfo key={user.id} user={user} />
			))}


		</>
	)
}

export default HomePage
