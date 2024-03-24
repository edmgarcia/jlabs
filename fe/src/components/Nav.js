import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = ({ session, seSession }) => {
	const navigate = useNavigate();

	const handleLogOut = (e) => {
		e.preventDefault();

		seSession(false);
		navigate("/");
	}

	return (
		<div className="Nav">
			<div className="container">
				<div className="nav-grid">
					<img src={logo} alt="logo" className="logo" />
					<div className="nav-action-wrapper">
						{
							session ?
								<>
									<NavLink to="/home" end className="nav-action-link">Home</NavLink>
									<NavLink
										to=""
										end
										className="nav-action-link"
										onClick={handleLogOut}
									>
										Log Out
									</NavLink>
								</>
								:
								<NavLink to="/" end className="nav-action-link">Log In</NavLink>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav;