const express = require('express')
const database = require('../connect')
const ObjectId = require('mongodb').ObjectId

let tasksRoutes = express.Router()

tasksRoutes.route('/').get(async (request, response) => {
  let db = database.getDb()
  let data = await db.collection('tasks').find({}).toArray()
  if (data.length > 0) {
    response.json(data)
  } else {
    throw new Error('Data was not found!')
  }
})

// Create
tasksRoutes.route('/').post(async (request, response) => {
  let db = database.getDb()
  let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    project: request.body.project,
    status: request.body.status,
    priority: request.body.priority,
  }
  let data = await db.collection('tasks').insertOne(mongoObject)

  response.json(data)
})

// Update

tasksRoutes.route('/:id').put(async (request, response) => {
  let db = database.getDb()
  let mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      project: request.body.project,
      status: request.body.status,
      priority: request.body.priority,
    },
  }
  let data = await db
    .collection('tasks')
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject)
  response.json(data)
})

// Delete

tasksRoutes.route('/').delete(async (request, response) => {
  let db = database.getDb()
  let data = await db
    .collection('tasks')
    .deleteOne({ _id: new ObjectId(request.params.id) })
  response.json(data)
})

module.exports = tasksRoutes
