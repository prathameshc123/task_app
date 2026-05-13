const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  searchTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Search route MUST be before /:id to avoid conflict
// GET /api/tasks/search?query=
router.get('/search', searchTasks);

// POST /api/tasks
router.post('/', createTask);

// GET /api/tasks
router.get('/', getTasks);

// GET /api/tasks/:id
router.get('/:id', getTask);

// PUT /api/tasks/:id
router.put('/:id', updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

// PATCH /api/tasks/:id/status
router.patch('/:id/status', updateTaskStatus);

module.exports = router;
