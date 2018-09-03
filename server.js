const ghost = require('ghost')
const express = require('express')

const app = express()

ghost().then(ghostServer => {
  app.use(require("./routes/rewritten"))
  app.use(require("./routes/api"))
  app.use(ghostServer.rootApp)
  ghostServer.start(app)
})

