const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		email_address: String,
		password: String,
	}
)

module.exports = mongoose.model("User", User);