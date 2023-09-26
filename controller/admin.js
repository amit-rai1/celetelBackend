// controllers/admin.js

// import Admin from '../model/admin';
// import Admin from "../model/Admin";
import Admin from '../model/admin'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import user from "../model/user";
import DistributedData from "../model/DistributedData";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if a user with the same email already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      throw new Error('Admin with this email already exists');
    }

    const admin = new Admin({ email, password: hashedPassword, role });
    const result = await admin.save();

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



// export const loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ username });

//     if (!admin) {
//       throw new Error('Admin not found');
//     }

//     const passwordMatch = await bcrypt.compare(password, admin.password);

//     if (!passwordMatch) {
//       throw new Error('Invalid password');
//     }

//     // Password is correct; generate a token and send a successful response
//     const token = jwt.sign({ username: admin.username }, 'secretkey', { expiresIn: '1h' });

//     res.send({ status: 200, success: true, msg: 'Admin logged in successfully', token });
//   } catch (error) {
//     res.send({ status: 400, success: false, msg: error.message });
//   }
// };


  

// export const loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ username });

//     if (!admin) {
//       throw new Error('Admin not found');
//     }

//     const passwordMatch = await bcrypt.compare(password, admin.password);

//     if (!passwordMatch) {
//       throw new Error('Invalid password');
//     }

//     const remoteAddress = req.connection.remoteAddress.replace('::ffff:', '');
//     const countryCode = await getCountryCodeByIP(remoteAddress);
//     console.log(countryCode,"ccd");

//     if (countryCode === 'US') {
//       // Password is correct; generate a token and send a successful response
//       const token = jwt.sign({ username: admin.username }, 'secretkey', { expiresIn: '1h' });

//       res.send({ status: 200, success: true, msg: 'Admin logged in successfully', token });
//     } else {
//       res.send({ status: 403, success: false, msg: 'Access denied' });
//     }
//   } catch (error) {
//     res.send({ status: 400, success: false, msg: error.message });
//   }
// };




export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new Error('Admin not found');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Use ipinfo.io to get geolocation data based on the IP address
    // axios.get(`http://ipinfo.io/${clientIp}/json`)
      axios.get(`http://ipinfo.io/8.8.8.8/json`)

      //8.8.8.8

    
      .then(response => {
        const data = response.data;
        console.log(data,"line115"); 

        const countryCode = data.country;
        console.log(countryCode,"countryCode1");

        // if (countryCode === 'US') {
        //   throw new Error('Admin from the US is not allowed to log in');
        // }

        if (countryCode === 'US') {
          // User from the US is allowed to log in
          const token = jwt.sign({ username: admin.username }, 'secretkey', { expiresIn: '1h' });
          res.send({ status: 200, success: true, msg: 'Admin logged in successfully', token });
        } else {
          // User not from the US is denied access
          throw new Error('Access Denied');
        }
      })
   

        // Password is correct; generate a token and send a successful response

      .catch(error => {
        console.error('Error:', error);
        res.send({ status: 500, success: false, msg: 'Internal Server Error,you are from other region cant login' });
      });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};


export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await user.findOne({ email });
    const adminRecord = await Admin.findOne({ email });

    if (!userRecord && !adminRecord) {
      throw new Error('User not found');
    }

    const record = userRecord || adminRecord; // Use the record that exists

    const passwordMatch = await bcrypt.compare(password, record.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { email: record.email, role: record.role, userId: record._id }, // Include userId in the token
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



