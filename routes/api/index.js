const router = require("express").Router()

router.use("/api/results", require("./results"))

module.exports = router