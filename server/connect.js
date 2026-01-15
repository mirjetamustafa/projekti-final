const { MongoClient } = require('mongodb')
require('dotenv').config()

const client = new MongoClient(process.env.ATLAS_URI)
let database

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect()
      database = client.db('taskManager')
      console.log('✅ Connected to MongoDB')
    } catch (err) {
      console.error('❌ Failed to connect to MongoDB:', err)
      process.exit(1) // ndal serverin nëse nuk lidhet
    }
  },

  getDb: () => {
    if (!database) {
      throw new Error('Database not initialized. Call connectToServer first.')
    }
    return database
  },
}
