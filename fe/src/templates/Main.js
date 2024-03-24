import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Main = ({ session, seSession }) => {
	return (
		<div className="Main">
			<header><Nav session={session} seSession={seSession} /></header>

			<main>{<Outlet />}</main>
		</div>
	)
}

export default Main;