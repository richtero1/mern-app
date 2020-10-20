const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.get('/query', async (req, res) => {
  const employees = await Employee.find({city: "Miami", department: "Engineering"});
  res.json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

router.post('/', async (req, res) => {
  const { first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state } = req.body;
  const employee = new Employee({first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state});
  await employee.save();
  res.json({status: 'Employee Saved'});
});

router.put('/:id', async (req, res) => {
  const { first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state } = req.body;
  const newEmployee = {first_name, last_name, email, birthdate, gender, ssn, phone_number, department, city, state};
  await Employee.findByIdAndUpdate(req.params.id, newEmployee);
  res.json({status: 'Employee Updated'});
});

router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({status: 'Employee Deleted'});
});

module.exports = router;