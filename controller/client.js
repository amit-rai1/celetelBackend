import client from '../model/client'
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';
// import { userSchema } from '../validation/userValidation';

import bcrypt, { compareSync } from "bcrypt"
import crypto from 'crypto';
import { adduserSchema } from '../validation/userValidation';



function generateRandomPassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_?";
  let randomPassword = '';

  for (let i = 0; i < 8; i++) { // Generating an 8-character password
    const randomIndex = crypto.randomInt(0, charset.length);
    randomPassword += charset[randomIndex];
  }

  return randomPassword;
}

// export const createUser = async (req, res) => {

//   console.log("enter");
//   try {
//     const generatedPassword = generateRandomPassword(); // Generate an 8-character random password

//     const newdata = new client({
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email:req.body.email,
//       username: req.body.username,
//       Phone:req.body.Phone,
//       password: bcrypt.hashSync(generatedPassword, 8),
//       role:'client'
//     })

//     const result = await newdata.save();
//     if (result) {
//       console.log(result,"result");
//       res.send({
//         status: true,
//         statusCode: 200,
//         message: "Registered Successfully",
//         result: { 
//           ...result._doc,
//           password: generatedPassword
//         }
//       });
//     }
//   } catch (error) {
//     throw error;
//   }
// }

export const createUser = async (req, res) => {
  try {
    const newdata = new client({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      Phone: req.body.Phone,
      password: bcrypt.hashSync(req.body.password, 8), // Hash the provided password
      role: 'client'
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

//userLogin APIs

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await client.findOne({ email });
    console.log(userData,"userData");

    if (!userData) {
      throw new Error('user not found');
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Password is correct; generate a token and send a successful response
    const token = jwt.sign({ email: userData.email }, 'secretkey', { expiresIn: '1h' });

    res.send({ status: 200, success: true, msg: 'user logged in successfully', token });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};


//userList API


// export const getUserList = async (req, res) => {
  
//   try {
//     const userList = await user.find({});
//     res.send({ status: 200, success: true, msz: 'fetch user list successfully', data: userList, });
//   } catch (error) {
//     console.log(error, "err");
//     res.send({ status: 400, success: false, msg: error.message });
//   }
// };
// export const getUserList = async (req, res) => {
//   try {
//     const { name } = req.query;
//     let query = {};

//     if (name) {
//       query = { $or: [{ first_name: new RegExp(name, 'i') }, { last_name: new RegExp(name, 'i') }] };
//     }

//     const userList = await user.find(query);

//     res.send({ status: 200, success: true, msz: 'fetch user list successfully', data: userList });
//   } catch (error) {
//     console.log(error, "err");
//     res.send({ status: 400, success: false, msg: error.message });
//   }
// };

export const getUserList = async (req, res) => {
  try {
    const { name, page = 1, pageSize = 10 } = req.query;
    let query = {};

    if (name) {
      query = { $or: [{ first_name: new RegExp(name, 'i') }, { last_name: new RegExp(name, 'i') }] };
    }

    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const userList = await client.find(query).skip(skip).limit(limit);

    res.send({ status: 200, success: true, msz: 'fetch user list successfully', data: userList });
  } catch (error) {
    console.log(error, "err");
    res.send({ status: 400, success: false, msg: error.message });
  }
};


export const deleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(req.body,"req");

    // Use deleteMany to delete multiple users based on their IDs
    const result = await client.deleteMany({ _id: { $in: ids } });
    const updatedUsers = await user.find(); // Fetch the updated list


    res.send({ status: 200, success: true, msz: 'Users deleted successfully', data: updatedUsers });
  } catch (error) {
    console.error(error);
    res.send({ status: 400, success: false, msg: error.message });
  }
};