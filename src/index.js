const express = require('express')

async function init() {
  const app = express()
  app.use(express.urlencoded())
  app.use(express.json())

  // models
  const staffModels = await require('./models/staff')()

  // services
  const staffService = require('./services/staff_service')(staffModels)

  // controllers
  app.use('/employee', require('./network/controllers/staff_controller')(app, staffService))

  app.listen(3000)
}

init()
