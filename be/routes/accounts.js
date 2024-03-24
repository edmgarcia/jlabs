const express = require("express");
const router = express.Router();

const getUser = require("../controllers/accounts/get");
router.get("/login", getUser);

module.exports = router;