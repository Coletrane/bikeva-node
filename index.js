const ghost = require('ghost')
const express = require('express')

const rewritten = require("./routes/rewritten")

const app = express()

ghost().then(ghostServer => {
  rewritten.postRoutes.forEach(route => {
    let ghostUrl
    rewritten.postDirs.forEach(dir => {
      if (route.startsWith(`/${dir}`)) {
        ghostUrl = route.replace(`/${dir}`, "")
      }
    })
    console.log(ghostUrl)
    app.get(route, (req, res) => {
      res.redirect(ghostUrl)
    })
  })

  app.use(ghostServer.rootApp)
  ghostServer.start(app)
})

