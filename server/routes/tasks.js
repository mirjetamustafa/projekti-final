const express = require('express')
const database = require('../connect')
const ObjectId = require('mongodb').ObjectId

let tasksRoutes = express.Router()

//get all tasks
tasksRoutes.get('/', async (req, res) => {
  try {
    const db = database.getDb()
    const tasks = await db.collection('tasks').find({}).toArray()
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Failed to fetch tasks' })
  }
})

// Create

tasksRoutes.post('/', async (req, res) => {
  try {
    const { title, description, project, status, priority } = req.body

    // SERVER-SIDE VALIDATION
    const errors = []
    if (!title) errors.push('Title is required')
    if (!description) errors.push('Description is required')
    if (!project) errors.push('Project is required')
    if (!status) errors.push('Status is required')
    if (!priority) errors.push('Priority is required')

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors })
    }

    const db = database.getDb()
    const newTask = { title, description, project, status, priority }

    const result = await db.collection('tasks').insertOne(newTask)

    // Send the newly created task back
    res.status(201).json({ ...newTask, _id: result.insertedId })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Failed to create task' })
  }
})

// Update

tasksRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, project, status, priority } = req.body

    // Optional: server-side validation can be added here as well

    const db = database.getDb()
    const result = await db
      .collection('tasks')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, description, project, status, priority } }
      )

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task updated successfully' })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Failed to update task' })
  }
})

// Delete

tasksRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const db = database.getDb()
    const result = await db
      .collection('tasks')
      .deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ message: 'Failed to delete task' })
  }
})

module.exports = tasksRoutes
