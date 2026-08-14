const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['Technical Issue', 'Billing', 'Account', 'Website Issue', 'Feature Request', 'Bug Report'] 
  },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    default: 'Active' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);