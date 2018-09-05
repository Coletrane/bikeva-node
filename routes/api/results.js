const router = require("express").Router()
const mysql = require("mysql")
let config = require("../../config.development")
if (process.env.NODE_ENV === "production") {
  config = require("../../config.production")
}

const conn = mysql.createConnection({

})
router.get("/:name", (req, res) => {
  // TODO: add logger
  console.log(`Querying databse for race: ${req.params.name}`)
  db.all(`SELECT * FROM results WHERE name = '${req.params.name}'`,
    (err, data) => {
      if (err) {
        res.status(500).send(err)
      }

      if (!data) {
        res.status(404).send()
      } else if (data.length > 1) {
        res.status(500).send("Duplicate race names")
      } else {
        console.log(`Results found! ${req.params.name}`)
        res.setHeader("Content-Type", "application/json")
        res.send(data[0].json)
      }
    })
})

module.exports = router