// controllers/admin.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import user from "../model/client";
import client from '../model/client';
import adminAuth from '../model/adminModel';
import userModel from '../model/userModel';

export const registerAdmin = async (req, res) => {
  console.log("enter");
  try {
    const { username, password, role } = req.body;

    console.log(req.body, "req.body");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if a user with the same email already exists
    const existingAdmin = await adminAuth.findOne({ username });

    if (existingAdmin) {
      throw new Error('Admin with this email already exists');
    }

    const adminData = new adminAuth({ username, password: hashedPassword, role });
    const result = await adminData.save(); // Corrected line

    res.send({
      status: 200,
      success: true,
      msg: 'Admin registered successfully',
      result: result._doc
    });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};

//login api

export const authLogin = async (req, res) => {
  try {
    const {username, password } = req.body;
    const userRecord = await client.findOne({ username });
    const adminRecord = await adminAuth.findOne({ username });
    const userRec = await userModel.findOne({ username });
    console.log(userRec,"rec");


    if (!userRecord && !adminRecord && !userRec) {
      throw new Error('User not found');
    }

    const record = userRecord || adminRecord || userRec; // Use the record that exists

    const passwordMatch = await bcrypt.compare(password, record.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { username: record.username, role: record.role, userId: record._id }, // Include userId in the token
      'secretkey',
      { expiresIn: '1h' }
    );

    console.log('Role:', record.role); // Output the role to the console

    res.send({
      status: 200,
      success: true,
      msg: 'User logged in successfully',
      role: record.role, // Include the role in the response
      userId: record._id, // Include the userId in the response
      token,
    });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};


