const express = require("express");
const router = express.Router();

const toolboxRoutes = require("./toolbox.route");


router.use("/tools", toolboxRoutes); // Any route defined inside toolboxRoutes should have /tools added in front of it.

module.exports = router;