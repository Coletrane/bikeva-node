const router = require("express").Router()
const mysql = require("mysql")

let config = require("../../config.development")
if (process.env.NODE_ENV === "production") {
  config = require("../../config.production")
}

const conn = mysql.createConnection({
  host: config.database.connection.host,
  user: config.database.connection.user,
  password: config.database.connection.password,
  database: config.database.connection.database
})
conn.connect()

router.get("/:name", (req, res) => {
  // TODO: add logger
  console.log(`Querying databse for race: ${req.params.name}`)
  conn.query(`SELECT * FROM results WHERE name = '${req.params.name}'`,
    (err, results, fields) => {
      if (err) {
        res.status(500).send(err)
      }

      if (!results || results.length === 0) {
        res.status(404).send()
      } else if (results.length > 1) {
        res.status(500).send("Duplicate race names")
      } else {
        console.log(`Results found! ${req.params.name}`)
        res.setHeader("Content-Type", "application/json")
        res.send(results[0].json)
      }
    })
})

module.exports = router