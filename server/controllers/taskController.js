const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description: description || '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate: dueDate || null,
    });

    res.status(201).json({ success: true, message: 'Task created successfully', task });
  } catch (error) {
    console.error('CreateTask Error:', error.message);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = { user: req.user._id };

    if (status && status !== 'All') filter.status = status;
    if (priority && priority !== 'All') filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    console.error('GetTasks Error:', error.message);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

// @desc    Search tasks by title
// @route   GET /api/tasks/search?query=
// @access  Private
const searchTasks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const tasks = await Task.find({
      user: req.user._id,
      title: { $regex: query, $options: 'i' },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    console.error('SearchTasks Error:', error.message);
    res.status(500).json({ message: 'Server error searching tasks' });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure user owns this task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error('GetTask Error:', error.message);
    res.status(500).json({ message: 'Server error fetching task' });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Task updated successfully', task });
  } catch (error) {
    console.error('UpdateTask Error:', error.message);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('DeleteTask Error:', error.message);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};

// @desc    Update task status (toggle)
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { status } = req.body;
    if (!status || !['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Pending or Completed' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, message: `Task marked as ${status}`, task });
  } catch (error) {
    console.error('UpdateStatus Error:', error.message);
    res.status(500).json({ message: 'Server error updating status' });
  }
};

module.exports = {
  createTask,
  getTasks,
  searchTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
