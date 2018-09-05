const ghost = require('ghost')
const express = require('express')
const mysql = require("mysql")

const app = express()

let config = require("./config.development")
if (process.env.NODE_ENV === "production") {
  config = require("./config.production")
}

const db = mysql.createConnection({
  host: config.database.connection.host,
  user: config.database.connection.user,
  password: config.database.connection.password,
  database: config.database.connection.database
})
db.connect()

ghost().then(ghostServer => {
  app.use(require("./routes/rewritten"))
  app.use(require("./routes/api"))
  app.use(ghostServer.rootApp)
  ghostServer.start(app)
})

module.exports = {
  db: db
}
