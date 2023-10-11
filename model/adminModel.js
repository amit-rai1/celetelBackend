// models/admin.js

import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin'], // Make sure role is either 'admin' or 'user'
  },
});

const adminAuth= mongoose.model('adminAuth', adminSchema);

export default adminAuth;
