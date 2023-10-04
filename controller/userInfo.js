import userInfo from "../model/userInfo";
var csv = require('csvtojson')
const xlsx = require('xlsx');
import moment from 'moment';
// import user from "../model/user";
import user from "../model/user";
import DistributedData from "../model/DistributedData";


const importUser = async (req, res) => {
  try {
    if (!req.file) {
      return res.send({ status: 400, success: false, msg: 'No file uploaded' });
    }

    const filename = req.file.originalname; // Get the filename
    // const numberOfFiles = req.files.length; // Get the number of files
    // const numberOfFiles = req.body.numberOfFiles


    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const userData = jsonData.map(row => ({

      firstname: row.Firstname,
      lastname: row.Lastname,
      Email: row.Email,
      Zip: row.Zip,
      Address: row.Address,
      City: row.City,
      State: row.State,
      Homephone: row.Homephone,
      Dateofbirth: row.Dateofbirth,
      filename: filename, // Save the filename
      // numberOfFiles: numberOfFiles, // Save the numberOfFiles

    }));

    const result = await userInfo.insertMany(userData);
    // const count = userData.length;

    res.send({
      status: 200,
      success: true,
      msg: 'File imported',
      filename: filename, // Add filename
      // numberOfFiles: numberOfFiles, // Add number of files
      numberOfData: userData.length,

      // count:count // Add number of data
    });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message, });
  }
};

export const getUserData = async (req, res) => {

  try {
    const { page = 1, pageSize = 10 } = req.query;
    let query = {};
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);
    const userData = await userInfo.find(query).skip(skip).limit(limit);;
    res.send({ status: 200, success: true, data: userData });
  } catch (error) {
    console.log(error, "err");
    res.send({ status: 400, success: false, msg: error.message });
  }
};
export const getUserDataDistributed = async (req, res) => {

  try {
    const userData = await DistributedData.find({});
    res.send({ status: 200, success: true, data: userData });
  } catch (error) {
    console.log(error, "err");
    res.send({ status: 400, success: false, msg: error.message });
  }
};

export const getUserDataByUserId = async (req, res) => {
  try {
    const userId = req.query.id; // Assuming userId is part of the route parameters



    if (!userId) {
      throw new Error('userId is required');
    }

    const userData = await DistributedData.find({ user: userId });
    const dataLength = userData.length; // Get the length of userData



    res.send({ status: 200, success: true, data: userData,dataLength });
  } catch (error) {
    console.log(error, "err");
    res.send({ status: 400, success: false, msg: error.message });
  }
};

// phse 2 dev***************//
// let usedData = 0; 
// let usedDataArray = [];
// let unusedDataArray = [];

// export const getDistributedData = async (req, res) => {
//   try {
//     unusedDataArray = [];  
//     const userData = await userInfo.find({});
//     const totalData = userData.length;

//     const numUsers = parseInt(req.body.numUsers);
//     const desiredData = parseInt(req.body.desiredData);

//     if (isNaN(numUsers) || isNaN(desiredData) || numUsers <= 0 || desiredData <= 0) {
//       return res.send({ status: 400, success: false, msg: 'Invalid numUsers or desiredCount value' });
//     }

//     if (desiredData > totalData) {
//       return res.send({ status: 400, success: false, msg: 'desiredData exceeds total count' });
//     }

//     const entriesPerUser = Math.floor(desiredData / numUsers);

//     if (entriesPerUser === 0) {
//       return res.send({ status: 400, success: false, msg: 'Not enough data to distribute equally' });
//     }

//     const User = await user.find({});

//     if (User.length < numUsers) {
//       return res.send({ status: 400, success: false, msg: 'Not enough users to distribute data' });
//     }

//     let userDataIndex = usedData; 
//     let distributedData = [];

//     for (let i = 0; i < numUsers; i++) {
//       let userEntries = [];

//       for (let j = 0; j < entriesPerUser; j++) {
//         if (userDataIndex < totalData) {
//           userEntries.push({
//             firstname: userData[userDataIndex]._doc.firstname,
//             lastname: userData[userDataIndex]._doc.lastname,
//             Address: userData[userDataIndex]._doc.Address,
//             State: userData[userDataIndex]._doc.State,
//             City: userData[userDataIndex]._doc.City,
//             Homephone: userData[userDataIndex]._doc.Homephone,
//             Email: userData[userDataIndex]._doc.Email,
//             Zip: userData[userDataIndex]._doc.Zip,
//             Dateofbirth: userData[userDataIndex]._doc.Dateofbirth
//           });

//           usedDataArray.push(userData[userDataIndex]._doc);
//           userDataIndex++;
//         }
//       }

//       usedData += userEntries.length;

//       distributedData.push({ user: User[i], data: userEntries });

//       if (userDataIndex >= totalData) break;

//       const distributedDataEntry = new DistributedData({ user: User[i], data: userEntries });
//       await distributedDataEntry.save();
//     }

//     // Calculate unusedData based on usedData from previous distributions
//     let unusedData = totalData - usedData;

//     for (let i = usedData; i < totalData; i++) {
//       unusedDataArray.push({
//         firstname: userData[i]._doc.firstname,
//         lastname: userData[i]._doc.lastname,
//         Address: userData[i]._doc.Address,
//         State: userData[i]._doc.State,
//         City: userData[i]._doc.City,
//         Homephone: userData[i]._doc.Homephone,
//         Email: userData[i]._doc.Email,
//         Zip: userData[i]._doc.Zip,
//         Dateofbirth: userData[i]._doc.Dateofbirth
//       });
//     }



//     // Save usedDataArray and unusedDataArray to the database
//     const dataDistributedEntry = new DistributedData({
//       usedData: usedDataArray,
//       unusedData: unusedDataArray
//     });
//     await dataDistributedEntry.save();

//     const dataDistributed = new DistributedData({
//       usedData,
//       unusedData,
//       usedDataArray, 
//       unusedDataArray
//     });
//     await dataDistributed.save();

//     await userInfo.updateOne({}, { usedData, unusedData });


//     res.send({
//       status: 200,
//       success: true,
//       msg: 'Data distributed successfully',
//       totalData,
//       numUsers,
//       desiredData,
//       entriesPerUser,
//       distributedData,
//       usedData,
//       unusedData
//     });

//   } catch (error) {
//     console.error(error);
//     res.send({ status: 400, success: false, msg: error.message });
//   }
// };



// Assuming 'userInfo' is the model name, if not, please replace it with the correct model name.

export const getDistributedData = async (req, res) => {
  try {
    const userData = await userInfo.find({});
    const totalData = userData.length;

    const numUsers = parseInt(req.body.numUsers);
    const desiredData = parseInt(req.body.desiredData);

    if (isNaN(numUsers) || isNaN(desiredData) || numUsers <= 0 || desiredData <= 0) {
      return res.send({ status: 400, success: false, msg: 'Invalid numUsers or desiredCount value' });
    }

    if (desiredData > totalData) {
      return res.send({ status: 400, success: false, msg: 'desiredData exceeds total count' });
    }

    const entriesPerUser = Math.floor(desiredData / numUsers);

    if (entriesPerUser === 0) {
      return res.send({ status: 400, success: false, msg: 'Not enough data to distribute equally' });
    }

    const User = await userInfo.find({});

    if (User.length < numUsers) {
      return res.send({ status: 400, success: false, msg: 'Not enough users to distribute data' });
    }

    let userDataIndex = 0; // Initialize to 0, assuming you want to start from the beginning
    let distributedData = [];

    for (let i = 0; i < numUsers; i++) {
      let userEntries = [];

      for (let j = 0; j < entriesPerUser; j++) {
        if (userDataIndex < totalData) {
          userEntries.push(userData[userDataIndex]);
          userDataIndex++;
        }
      }

      distributedData.push({ user: User[i], data: userEntries });

      if (userDataIndex >= totalData) break;

      const distributedDataEntry = new DistributedData({ user: User[i], data: userEntries });
      await distributedDataEntry.save();
    }

    // Calculate unusedData based on usedData from previous distributions
    let usedData = userDataIndex;
    let unusedData = totalData - usedData;

    // Save usedData and unusedData to the database
    await userInfo.updateMany({}, { usedData, unusedData });

    res.send({
      status: 200,
      success: true,
      msg: 'Data distributed successfully',
      totalData,
      numUsers,
      desiredData,
      entriesPerUser,
      distributedData,
      usedData,
      unusedData
    });

  } catch (error) {
    console.error(error);
    res.send({ status: 400, success: false, msg: error.message });
  }
};





// data distributed specifically 


export const distributeDataToUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const entryIds = req.body.entryIds; // Assuming entryIds is an array

    const User = await user.findById(userId);

    if (!User) {
      return res.send({ status: 400, success: false, msg: 'User not found' });
    }

    for (const entryId of entryIds) {
      const dataEntry = userInfo.find(entry => entry._id.toString() === entryId);

      if (!dataEntry) {
        return res.send({ status: 400, success: false, msg: `Data entry not found for ID: ${entryId}` });
      }

      User.distributedData.push({
        firstname: dataEntry.firstname,
        lastname: dataEntry.lastname,
        Address: dataEntry.Address,
        State: dataEntry.State,
        City: dataEntry.City,
        Homephone: dataEntry.Homephone,
        Email: dataEntry.Email,
        Zip: dataEntry.Zip,
        Dateofbirth: dataEntry.Dateofbirth
      });
    }

    await User.save();

    res.send({
      status: 200,
      success: true,
      msg: 'Data distributed successfully to user',
      userId,
      entryIds
    });

  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};



export default importUser;