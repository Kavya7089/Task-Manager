import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
    });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, status = 'todo' } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      title: title.trim(),
      status,
      user_id: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const task = await Task.findOne({
      where: { id, user_id: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields if provided
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: 'Task title cannot be empty' });
      }
      task.title = title.trim();
    }

    if (status !== undefined) {
      if (!['todo', 'in_progress', 'done'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      task.status = status;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, user_id: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

export default router;