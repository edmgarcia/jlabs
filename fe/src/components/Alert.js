import { useEffect } from "react";

const Alert = ({ error, setError }) => {
	useEffect(() => {
		const alertElem = document.querySelector(".alert");

		let alertTimeout = setTimeout(() => {
			if (error) {
				setError(null);
			}
		}, 5000);

		alertElem.addEventListener("click", () => {
			setError(null);
		});

		return () => {
			clearTimeout(alertTimeout);
		}
	}, [error, setError]);

	return (
		<div className="alert danger">{error}</div>
	)
}

export default Alert;