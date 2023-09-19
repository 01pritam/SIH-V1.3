const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
