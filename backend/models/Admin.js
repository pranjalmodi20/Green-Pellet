const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Admin email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Admin password is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
