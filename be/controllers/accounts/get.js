const User = require("../../models/Users");
const axios = require("axios");

const get = async (req, res) => {
	const { email, password, myIP } = req.query;

	try {

		const userData = await User.findOne({ email, password });
		const myGeo = await axios.get(`https://ipinfo.io/${myIP}/geo`);

		if (!userData) {
			res.send(
				{
					success: false,
					message: "The Email Address or Password is incorrect.",
					myGeo: null,
					redirect: null,
				}
			)
		} else {
			res.send(
				{
					success: true,
					message: "You've successfully logged in.",
					myGeo: myGeo.data,
					redirect: "/home",
				}
			)
		}
	} catch (error) {
		res.send(
			{
				success: false,
				message: error.message,
				myGeo: null,
				redirect: null,
			}
		)
	}
}

module.exports = get;