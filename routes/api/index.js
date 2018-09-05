const router = require("express").Router()

router.use("/api/results", require("./results"))
router.use("/api/weather", require("./weather"))

module.exports = router