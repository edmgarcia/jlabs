const express = require("express");
const router = express.Router();

const getGeo = require("../controllers/geos/get");
router.get("/get-geo", getGeo);

module.exports = router;