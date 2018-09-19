const router = require("express").Router()
const db = require("../../server").db

router.get("/:name", (req, res) => {
  // TODO: add logger
  console.info(`Querying databse for race: ${req.params.name}`)
  db.query(
    `SELECT * FROM results WHERE name = '${req.params.name}'`,
    (err, results, fields) => {
      if (err) {
        console.error(err)
        res.status(500).send(err)
      }

      if (!results || results.length === 0) {
        res.status(404).send()
      } else if (results.length > 1) {
        res.status(500).send("Duplicate race names")
      } else {
        console.log(`Results found! ${req.params.name}`)
        res.json(results[0].json)
      }
    }
  )
})

module.exports = router
