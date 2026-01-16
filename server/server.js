const express = require('express')
const cors = require('cors')
const connect = require('./connect')
const tasksRoutes = require('./routes/tasks')
const { router: authRoutes, authMiddleware } = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json()) // për të lexuar JSON nga frontend

app.use((req, res, next) => {
  req.app.set('db', connect.getDb())
  next()
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' })
})

// Auth

app.use('/api/auth', authRoutes)

// Routes
app.use('/api/tasks', tasksRoutes)

// Start server
const startServer = async () => {
  try {
    await connect.connectToServer()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
  }
}

startServer()
