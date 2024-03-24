import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Landing = ({ session, seSession }) => {
	return (
		<div className="Landing">
			<header><Nav session={session} /></header>

			<main>
				{<Outlet />}
			</main>
		</div>
	)
}

export default Landing;