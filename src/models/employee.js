const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpSchema = new Schema({
  first_name: { type: String, required: true }, 
  last_name: { type: String, required: true }, 
  email: { type: String, required: true }, 
  birthdate: { type: String, required: true }, 
  gender: { type: String, required: true }, 
  ssn: { type: String, required: true }, 
  phone_number: { type: String, required: true }, 
  department: { type: String, required: true }, 
  city: { type: String, required: true }, 
  state: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmpSchema);