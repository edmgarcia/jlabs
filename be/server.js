const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const corsConfig = {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PATCH", "DELETE"],
	credentials: true,
};

mongoose.connect(DB_URI)
	.then(() => console.log("DB Connected!"))
	.catch(error => console.log(error));

app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accounts = require("./routes/accounts");
app.use("/api", accounts);

const geos = require("./routes/geos");
app.use("/api", geos);

app.listen(PORT, () => console.log(`Server is up at PORT: ${PORT}`));