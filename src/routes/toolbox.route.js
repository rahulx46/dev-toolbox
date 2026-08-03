const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: false,
        message: "ToolBox API is running"
    })
})

module.exports = router;