const connect = require('./connect')
const express = require('express')
const cors = require('cors')
const tasks = require('./routes/tasks')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(tasks)

app.listen(PORT, () => {
  connect.connectToServer()
  console.log(`Server is runnng on port ${PORT}`)
})
