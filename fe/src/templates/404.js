import { NavLink } from "react-router-dom";
const ErrorPage = () => {
	return (
		<div className="error-page">
			<h1>Ooops... You got lost in the woods.</h1>
			<p>This page doesn't exist.</p>
			<NavLink to="/" className="btn-default">Lets go back Home</NavLink>
		</div>
	)
}

export default ErrorPage;