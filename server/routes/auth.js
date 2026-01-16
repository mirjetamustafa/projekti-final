const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body
    const db = req.app.get('db')

    // Kontrollo nëse user ekziston
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return res.status(400).json({ errors: { email: 'User already exists' } })
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = {
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date(),
    }

    const result = await db.collection('users').insertOne(newUser)

    res.status(201).json({ message: 'User created', _id: result.insertedId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ errors: { global: err.message } })
  }
})

// === LOGIN ===
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const db = req.app.get('db')

    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return res.status(401).json({ errors: { global: 'Invalid credentials' } })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ errors: { global: 'Invalid credentials' } })
    }

    const token = jwt.sign(
      {
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // token 7 ditë
    )

    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ errors: { global: err.message } })
  }
})

// === MIDDLEWARE PËR AUTHENTICATION ===
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ errors: { global: 'Unauthorized' } })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({ errors: { global: 'Invalid token' } })
  }
}

module.exports = { router, authMiddleware }
