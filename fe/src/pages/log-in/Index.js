import { logInAPI } from "../../helpers/endpoints/accounts"
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { publicIpv4 } from "public-ip";
import { useState } from "react";
import axios from "axios";
import "./login.css";

const Index = ({ seSession, setMyGeo }) => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const myIPv4 = await publicIpv4();

		if (!formData.email || !formData.password) return setError("All fields are required.");

		const response = await axios.get(logInAPI, { params: { ...formData, myIP: myIPv4 } });
		const { data } = response;

		seSession(data.success);
		navigate(data.redirect);
		setMyGeo({ ...data.myGeo });
		setError(data.message);
	}

	return (
		<div className="log-in">
			<div className="container">
				<div className="log-in-wrapper">
					<h3>Welcome back, squiddy!</h3>
					<form onSubmit={e => handleFormSubmit(e)}>
						<div className="input-wrapper">
							<label htmlFor="email">
								Email Address
								<input
									type="email"
									id="email"
									required={true}
									value={formData.email || ""}
									onChange={e => setFormData({ ...formData, [e.target.id]: e.target.value })}
								/>
							</label>
						</div>

						<div className="input-wrapper">
							<label htmlFor="password">
								Password
								<input
									type="password"
									id="password"
									required={true}
									value={formData.password || ""}
									onChange={e => setFormData({ ...formData, [e.target.id]: e.target.value })}
								/>
							</label>
						</div>

						<div className="input-wrapper">
							<input
								type="submit"
								className="btn-theme"
								value="Submit"
								onSubmit={e => handleFormSubmit(e)}
							/>
						</div>
					</form>


				</div>

				{error && <Alert error={error} setError={setError} />}
			</div>
		</div>
	)
}

export default Index;