const ghost = require('ghost')

ghost().then(ghostServer => {
  ghostServer.start()
})