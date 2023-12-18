
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';

import bcrypt, { compareSync } from "bcrypt"
import crypto from 'crypto';
import subUserModel from '../model/subuserModel'
import { sendEmail } from '../middleware/sendEmail';

export const subUserCreate = async (req, res) => {
 

    try {
      // Check if the request body contains a password
      if (!req.body.password) {
        return res.status(400).send({
          status: false,
          statusCode: 400,
          message: "Password is required"
        });
      }
  
      const newdata = new subUserModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        Phone: req.body.Phone,
        password: bcrypt.hashSync(req.body.password, 8), // Hash the provided password
        role: 'subuser'
      })
  
      const result = await newdata.save();
      if (result) {
        console.log(result, "result");
        res.send({
          status: true,
          statusCode: 200,
          message: "Registered Successfully",
          result: {
            ...result._doc,
            password: req.body.password // Send the provided password in the response
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }



  export const getSubuserList = async (req, res) => {
    try {
        // Fetch the list of users from the database or data source
        // For example, assuming userModel.find() fetches users from a MongoDB collection
        const userList = await subUserModel.find({}, { password: 0 }); // Exclude the password field
  
        res.status(200).json({
            success: true,
            message: 'User list retrieved successfully',
            users: userList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user list',
            error: error.message,
        });
    }
  };
  

  // Get user by ID
export const getSubUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await subUserModel.findById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send({
      status: true,
      statusCode: 200,
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    res.status(500).send('An error occurred while fetching the user');
  }
};
// Update user by ID
export const updatesubUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, username, Phone, password } = req.body;

    const updatedUser = await subUserModel.findByIdAndUpdate(
      id,
      { first_name, last_name, username, Phone, password },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.send({
      status: true,
      statusCode: 200,
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    res.status(500).send('An error occurred while updating the user');
  }
};

export const sendEmailsInfo = async (req, res) => {
  try {

    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890'
      // Add other user details as needed
    };


    // Define static email details
    const from = 'amit.rai@celetel.com';
    const toList = ['manishpatra254@gmail.com', 'amitrai49@gmail.com',"raiamit9264@gmail.com"];
    const subject = 'Testing for Download functionality';
    const text = `Hello ${user.name},\n\nThank you for using our service. Your email is ${user.email} and your phone number is ${user.phone}.\n\nBest regards,\nThe Team`;

    // Use the sendEmail function passing defined parameters
    const result = await sendEmail(from, toList, subject, text);

    res.status(200).json({ success: true, msg: 'Static emails sent successfully', result });
  } catch (error) {
    console.error('Error sending static emails:', error);
    res.status(500).json({ success: false, msg: 'Failed to send static emails', error: error.message });
  }
};

//subuser create api


