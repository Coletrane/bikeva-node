
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database("./content/data/ghost.db")


module.exports = {
  endpoint: "/results/:name",

}

