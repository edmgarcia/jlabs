const axios = require("axios");

const get = async (req, res) => {
	const { ip } = req.query;

	try {

		const geoData = await axios.get(`https://ipinfo.io/${ip}/geo`);

		if (geoData?.bogon) {
			res.send(
				{
					success: false,
					message: "It's not a valida Public IP address.",
					data: false,
					redirect: null,
				}
			)
		} else {
			res.send(
				{
					success: true,
					message: "Displaying result.",
					data: geoData.data,
					redirect: "/home",
				}
			)
		}
	} catch (error) {
		res.send(
			{
				success: false,
				message: error.message,
				data: false,
				redirect: null,
			}
		)
	}
}

module.exports = get;