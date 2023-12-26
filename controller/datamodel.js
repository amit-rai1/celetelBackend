
import datamodel from '../model/datamodel'
import moment from 'moment-timezone';
import PermissionModel from '../model/permission';
const xlsx = require('xlsx');

export const addData = async (req, res) => {
  try {
    const {SL_NO, MSISDN, SIM_Number,Machine_No, Circle, Operators, Status } = req.body; // Added Status
    const newData = new datamodel({SL_NO, MSISDN, SIM_Number,Machine_No, Circle, Operators, Status }); // Added Status
    const data = await newData.save();
    console.log(data,"data1")
    res.send({
      status: 200,
      message: 'Data added successfully!', data
    });
  } catch (error) {
    res.status(500).send('An error occurred while adding data.');
  }
};

 export const addExcelData = async (req, res) => {
  console.log("hit")


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
      SL_NO:row.SL_NO,
      MSISDN: row.MSISDN,
      SIM_Number: row.SIM_Number,
      Circle: row.Circle,
      Machine_No:row.Machine_No,
      Operators: row.Operators,

      Status: row.Status,
    

    }));

    const result = await datamodel.insertMany(userData);
    const count = await datamodel.countDocuments(); 
    // const count = userData.length;

    res.send({
      status: 200,
      success: true,
      msg: 'File imported',
      filename: filename, // Add filename
      numberOfFiles: count, // Add number of files

      // count:count // Add number of data
    });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message, });
  }
};

// export const getAllData = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters, default to 10 if not provided

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const totalItems = await datamodel.countDocuments();

//     const allData = await datamodel.find().skip(startIndex).limit(limit);

//     // Pagination result
//     const pagination = {};
//     if (endIndex < totalItems) {
//       pagination.next = {
//         page: page + 1,
//         limit: limit
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit: limit
//       };
//     }

//     res.send({ data: allData, pagination });
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching data.');
//   }
// };



export const getDataById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL params
    const data = await datamodel.findById(id);

    if (!data) {
      return res.status(404).send('Data not found');
    }

    res.send(data);
  } catch (error) {
    res.status(500).send('An error occurred while fetching data.');
  }
};


// export const updateData = async (req, res) => {
//   try {
//     const { id } = req.params; // Assuming you're passing the ID in the URL params
//     const { MSISDN, SIM_Number,Operators , Circle,Status } = req.body;

//     const updatedData = await datamodel.findByIdAndUpdate(id, {
//       MSISDN,
//       SIM_Number,
//       Operators,
//       Circle,
//       Status
//     }, { new: true });

//     if (!updatedData) {
//       return res.status(404).send('Data not found');
//     }

//     res.send({ message: 'Data updated successfully!', data: updatedData });
//   } catch (error) {
//     res.status(500).send('An error occurred while updating data.');
//   }
// };
export const updateData = async (req, res) => {
  try {
    const userId = req.user?.userId; // Get logged-in user's ID
    console.log(userId, 'userId');

    const { id } = req.params; // Assuming you're passing the ID in the URL params
    const {SL_NO, MSISDN, SIM_Number, Operators, Circle, Status } = req.body;

    const userPermissions = await PermissionModel.findOne({ userId });

    // Variable to track who initiated the update
    let updater = '';

    // If permissions exist and the user is not admin (assuming admin has unrestricted permissions)
    if (userPermissions && !userPermissions.isAdmin) {
      updater = 'user'; // If user initiated the update

      const allowedFields = userPermissions.editableFields;

      const newDataFields = {SL_NO, MSISDN, SIM_Number, Operators, Circle, Status };
      const filteredData = {};

      // Filter the request body to include only allowed fields
      Object.entries(newDataFields).forEach(([key, value]) => {
        if (allowedFields.includes(key)) {
          filteredData[key] = value;
        }
      });

      const updatedData = await datamodel.findByIdAndUpdate(
        id,
        filteredData,
        { new: true }
      );

      if (!updatedData) {
        return res.status(404).send('Data not found');
      }

      return res.send({ message: 'Data updated successfully!', data: updatedData, updatedBy: updater });
    }

    // If the user is admin or has unrestricted permissions
    updater = 'admin'; // If admin initiated the update

    const updatedData = await datamodel.findByIdAndUpdate(
      id,
      {SL_NO, MSISDN, SIM_Number, Operators, Circle, Status },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send('Data not found');
    }

    res.send({ message: 'Data updated successfully!', data: updatedData, updatedBy: updater });
  } catch (error) {
    res.status(500).send('An error occurred while updating data.');
  }
};



// export const deleteData = async (req, res) => {
//   try {
//     const { ids } = req.body; // Assuming you're sending an array of IDs in the request body

//     const deletedData = await datamodel.deleteMany({ _id: { $in: ids } });

//     if (!deletedData) {
//       return res.status(404).send('Data not found');
//     }

//     res.send({
//       status: 200,
//       message: 'Data deleted successfully!', deletedData
//     });
//   } catch (error) {
//     res.status(500).send('An error occurred while deleting data.');
//   }
// };
// export const deleteData = async (req, res) => {
//   try {
//     const { ids } = req.body;
//     console.log(req.body,"req")

//     const deletedData = await datamodel.deleteMany({ _id: { $in: ids } });

//     if (!deletedData || deletedData.deletedCount === 0) {
//       return res.status(404).send('Data not found');
//     }

//     res.send({
//       status: 200,
//       message: 'Data deleted successfully!',
//       deletedData
//     });
//   } catch (error) {
//     res.status(500).send('An error occurred while deleting data.');
//   }
// };
export const deleteData = async (req, res) => {
  try {
    const { ids } = req.body;
    const formattedDeletedAt = moment(new Date()).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    const deletedData = await datamodel.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          deleted: true,
         
          deletedAt: new Date()
        }
      }
    );

    if (!deletedData || deletedData.nModified === 0) {
      return res.status(404).send('Data not found');
    }
    res.send({
      status: 200,
      message: 'Data deleted successfully!',
      deletedData,
      formattedDeletedAt
    });
  } catch (error) {
    res.status(500).send('An error occurred while deleting data.');
  }
};


//  export const getSimStatistics = async (req, res) => {
//   try {
//     const totalSim = await datamodel.countDocuments();

//     const totalActive = await datamodel.countDocuments({ Status: 'Active' });
//     const totalInactive = await datamodel.countDocuments({ Status: 'Inactive' });
//     const circleOperator=await datamodel.find({Operators});

//     const operatorStats = await datamodel.aggregate([
//       {
//         $group: {
//           _id: '$Operators',
//           totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
//           totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
//         }
//       }
//     ]);
//     const circleStats = await datamodel.aggregate([
//       {
//         $group: {
//           _id: '$Circle',
//           totalSimByCircle: { $sum: 1 },
//           totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
//           totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
//           circleOperator: { $sum: { $cond: [{ $eq: [Operators] }, ] } }

          
          
//         }
//       }
//     ]);

//     res.send({totalSim, totalActive, totalInactive,circleStats, operatorStats, status: 200, });
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching data.');
//   }
// };



// export const getSimStatistics = async (req, res) => {
//   try {
//     const totalSim = await datamodel.countDocuments();

//     const totalActive = await datamodel.countDocuments({ Status: 'Active' });
//     const totalInactive = await datamodel.countDocuments({ Status: 'Inactive' });

//     const operatorStats = await datamodel.aggregate([
//       {
//         $group: {
//           _id: '$Operators',
//           totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
//           totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
//         }
//       }
//     ]);

//     const circleStats = await datamodel.aggregate([
//       {
//         $group: {
//           _id: '$Circle',
//           totalSimByCircle: { $sum: 1 },
//           totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
//           totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } },
//           operators: { $addToSet: '$Operators' }
//         }
//       }
//     ]);

//     const formattedCircleStats = circleStats.map(stat => {
//       return {
//         Location: stat._id,
//         TotalSim: stat.totalSimByCircle,
//         ActiveSims: stat.totalActive,
//         InactiveSims: stat.totalInactive,
//         Operators: stat.operators.filter(Boolean)
//       };
//     });

//     res.send({
//       totalSim,
//       totalActive,
//       totalInactive,
//       circleStats: formattedCircleStats,
//       operatorStats,
//       status: 200
//     });
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching data.');
//   }
// };

// export const getSimStatistics = async (req, res) => {
//   try {
//     const totalSim = await datamodel.countDocuments({ deleted: false });

//     const totalActive = await datamodel.countDocuments({ Status: 'Active', deleted: false });
//     const totalInactive = await datamodel.countDocuments({ Status: 'Inactive', deleted: false });

//     const operatorStats = await datamodel.aggregate([
//       {
//         $match: { deleted: false } // Filter out deleted documents
//       },
//       {
//         $group: {
//           _id: '$Operators',
//           totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
//           totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
//         }
//       }
//     ]);

//     const circleStats = await datamodel.aggregate([
//       {
//         $match: { deleted: false } // Filter out deleted documents
//       },
//       {
//         $group: {
//           _id: '$Circle',
//           totalSimByCircle: { $sum: 1 },
//           totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
//           totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } },
//           operators: { $addToSet: '$Operators' }
//         }
//       }
//     ]);

//     const formattedCircleStats = circleStats.map(stat => {
//       return {
//         Location: stat._id,
//         TotalSim: stat.totalSimByCircle,
//         ActiveSims: stat.totalActive,
//         InactiveSims: stat.totalInactive,
//         Operators: stat.operators.filter(Boolean)
//       };
//     });

//     res.send({
//       totalSim,
//       totalActive,
//       totalInactive,
//       circleStats: formattedCircleStats,
//       operatorStats,
//       status: 200
//     });
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching data.');
//   }
// };


//add new logic 26/12/2023


export const getSimStatistics = async (req, res) => {
  try {
    const totalSim = await datamodel.countDocuments({ deleted: false });

    const totalActive = await datamodel.countDocuments({ Status: 'Active', deleted: false });
    const totalInactive = await datamodel.countDocuments({ Status: 'Inactive', deleted: false });

    const operatorStats = await datamodel.aggregate([
      {
        $match: { deleted: false } // Filter out deleted documents
      },
      {
        $group: {
          _id: '$Operators',
          totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
          totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
        }
      }
    ]);

    const circleStats = await datamodel.aggregate([
      {
        $match: { deleted: false } // Filter out deleted documents
      },
      {
        $group: {
          _id: { Circle: '$Circle', Operators: '$Operators' },
          totalSimByCircle: { $sum: 1 },
          totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
          totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
        }
      },
      {
        $group: {
          _id: '$_id.Circle',
          operators: {
            $addToSet: {
              name: '$_id.Operators',
              totalSimCount: '$totalSimByCircle',
              activeSimCount: '$totalActive',
              inactiveSimCount: '$totalInactive'
            }
          },
          TotalSim: { $sum: '$totalSimByCircle' },
          ActiveSims: { $sum: '$totalActive' },
          InactiveSims: { $sum: '$totalInactive' }
        }
      }
    ]);

    const formattedCircleStats = circleStats.map(stat => {
      return {
        Location: stat._id,
        TotalSim: stat.TotalSim,
        ActiveSims: stat.ActiveSims,
        InactiveSims: stat.InactiveSims,
        Operators: stat.operators
      };
    });

    res.send({
      totalSim,
      totalActive,
      totalInactive,
      circleStats: formattedCircleStats,
      operatorStats,
      status: 200
    });
  } catch (error) {
    res.status(500).send('An error occurred while fetching data.');
  }
};



// export const getAllData = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters, default to 10 if not provided

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const totalItems = await datamodel.countDocuments();

//     const allData = await datamodel.find().skip(startIndex).limit(limit);

//     // Pagination result
//     const pagination = {};
//     if (endIndex < totalItems) {
//       pagination.next = {
//         page: page + 1,
//         limit: limit
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit: limit
//       };
//     }

//     res.send({ data: allData, pagination });
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching data.');
//   }
// };
// export const getAllData = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const Circle = req.query.Circle; // Get the circle parameter from the query
//     const Status = req.query.Status; // Get the status parameter from the query
//     const Operators = req.query.Operators; 
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     let query = {}; // Initialize an empty query object

//     // If circle parameter is provided, add it to the query
//     if (Circle) {
//       query.Circle = Circle;
//     }

//     // If status parameter is provided, add it to the query
//     if (Status) {
//       query.Status = Status;
//     }

//     if (Operators) {
//       query.Operators = Operators;
//     }

//     const totalItems = await datamodel.countDocuments(query);

//     const allData = await datamodel.find(query).skip(startIndex).limit(limit);

//     const pagination = {};
//     if (endIndex < totalItems) {
//       pagination.next = {
//         page: page + 1,
//         limit: limit
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit: limit
//       };
//     }

//     res.send({ data: allData, pagination,totalItems  });
//   } catch (error) {
//     res.status(500).send('An error occurred while fetching data.');
//   }
// };
export const getAllData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const Circle = req.query.Circle;
    const Status = req.query.Status;
    const Operators = req.query.Operators; 
    const { MSISDN} = req.query;
    console.log(MSISDN,"MSISDN")

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query = { deleted: false }; // Always exclude soft-deleted records

    if (Circle) {
      query.Circle = Circle;
    }

    if (Status) {
      query.Status = Status;
    }

    if (Operators) {
      query.Operators = Operators;
    }

    const totalItems = await datamodel.countDocuments(query);

    const allData = await datamodel.find(query).skip(startIndex).limit(limit);

    const pagination = {};
    if (endIndex < totalItems) {
      pagination.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit
      };
    }
    if (MSISDN) {
      query.MSISDN = MSISDN;

      console.log(MSISDN,"MSISDNif")
  }

//   if (SIM_Number) {
//       query.SIM_Number = SIM_Number;
//   }

//   if (Machine_No) {
//     query.Machine_No = Machine_No;
// }

// if (SL_NO){
//   query.SL_NO=SL_NO;
// }
    res.send({ data: allData, pagination, totalItems });
  } catch (error) {
    res.status(500).send('An error occurred while fetching data.');
  }
};



export const searchData = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query = { deleted: false }; // Exclude soft-deleted records

    let regexQuery = {}; // Initialize regex query

    if (searchTerm) {
      regexQuery = {
        $or: [
          { MSISDN: { $regex: searchTerm, $options: 'i' } },
          { SIM_Number: { $regex: searchTerm, $options: 'i' } },
        ],
      };
      query = { ...query, ...regexQuery };
    }

    const totalItems = await datamodel.countDocuments(query);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const sortCriteria = { MSISDN: 1 }; // Sort by MSISDN in ascending order

    const allData = await datamodel
      .find(query)
      .sort(sortCriteria)
      .skip(startIndex)
      .limit(limit);

    const pagination = {};
    if (endIndex < totalItems) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.send({ data: allData, pagination, totalItems });
  } catch (error) {
    res.status(500).send('An error occurred while fetching data.');
  }
};

