import Input from '../shared/Input/Input'
import Select from '../shared/Select/Select'
import {
  categoryOptions,
  priorityOptions,
  statusOptions,
} from '../shared/utils/categoryColors'

import Button from '../shared/Button/Button'
import Textarea from '../shared/Textarea/Textarea'
import type { TaskFormType, TaskResponse } from '../../api/Task/task.types'
import React, { useEffect, useState } from 'react'
import { createTask } from '../../api/Task/task.client'
import { toast } from 'react-toastify'
import { updateTask } from '../../api/Task/task'

const initialValues: TaskFormType = {
  title: '',
  description: '',
  project: '',
  status: '',
  priority: '',
}

type TaskFormProps = {
  initialData?: TaskResponse | null
  onSuccess?: () => void
}

const TaskForm = ({ initialData, onSuccess }: TaskFormProps) => {
  const [formValues, setFormValues] = useState<TaskFormType>(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          project: initialData.project,
          status: initialData.status,
          priority: initialData.priority,
        }
      : initialValues
  )
  const [errors, setErrors] = useState<Partial<TaskFormType>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSelect = (name: keyof TaskFormType, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors: Partial<TaskFormType> = {}
    if (!formValues.title.trim()) newErrors.title = 'Title is required'
    if (!formValues.description.trim())
      newErrors.description = 'Description is required'
    if (!formValues.project.trim()) newErrors.project = 'Project is required'
    if (!formValues.status.trim()) newErrors.status = 'Status is required'
    if (!formValues.priority.trim()) newErrors.priority = 'Priority is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      if (initialData?._id) {
        await updateTask(initialData._id, formValues)
        toast.success('Task updated successfully!')
      } else {
        await createTask(formValues)
        toast.success('Task created successfully!')
      }
      onSuccess?.()
      setFormValues(initialValues)
    } catch (err: any) {
      console.log(err.response?.data)
      if (err.response?.data.errors) {
        err.response.data.errors.forEach((e: string) => toast.error(e))
      } else {
        console.error(err)
        toast.error('Error creating task')
      }
    }
  }
  useEffect(() => {
    if (initialData) {
      setFormValues({
        title: initialData.title,
        description: initialData.description,
        project: initialData.project,
        status: initialData.status,
        priority: initialData.priority,
      })
    } else {
      setFormValues(initialValues)
    }
  }, [initialData])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Task title"
        name="title"
        value={formValues.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Textarea
        label="Description"
        placeholder="Task description"
        rows={3}
        name="description"
        value={formValues.description}
        onChange={handleChange}
        error={errors.description}
      />

      <Select
        label="Project"
        name="project"
        options={categoryOptions}
        value={formValues.project}
        onChange={(value) => handleSelect('project', value)}
        error={errors.project}
      />

      <Select
        label="Status"
        name="status"
        options={statusOptions}
        value={formValues.status}
        onChange={(value) => handleSelect('status', value)}
        error={errors.status}
      />

      <Select
        label="Priority"
        name="priority"
        options={priorityOptions}
        value={formValues.priority}
        onChange={(value) => handleSelect('priority', value)}
        error={errors.priority}
      />
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="submit"
          onClick={() => {
            setFormValues(initialValues)
            onSuccess?.()
          }}
          className="bg-gray-100 hover:bg-gray-50"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-500"
        >
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
