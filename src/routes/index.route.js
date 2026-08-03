const express = require("express");
const router = express.Router();

const toolboxRoutes = require("./toolbox.route");


router.use("/tools", toolboxRoutes);

module.exports = router;