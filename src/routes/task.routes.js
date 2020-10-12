const express = require('express');
const router = express.Router();

// Task Model
const Task = require('../models/task');

// GET all Tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get('/query', async (req, res) => {
  const tasks = await Task.find({city: "Miami"});
  res.json(tasks);
});

// GET all Tasks
router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// ADD a new task
router.post('/', (req, res) => {
  const { first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state } = req.body;
  const task = new Task({first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state});
  task.save();
  res.json({status: 'Task Saved'});
});

// UPDATE a new task
router.put('/:id', (req, res) => {
  const { first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state } = req.body;
  const newTask = {first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state};
  Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({status: 'Task Updated'});
});

router.delete('/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id);
  res.json({status: 'Task Deleted'});
});

module.exports = router;