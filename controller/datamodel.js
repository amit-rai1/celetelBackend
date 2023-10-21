
import datamodel from '../model/datamodel'
const xlsx = require('xlsx');

export const addData = async (req, res) => {
  try {
    const { MSISDN, SIM_Number, Circle, Operators, Status } = req.body; // Added Status
    const newData = new datamodel({ MSISDN, SIM_Number, Circle, Operators, Status }); // Added Status
    const data = await newData.save();
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

      MSISDN: row.MSISDN,
      SIM_Number: row.SIM_Number,
      Circle: row.Circle,
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


export const updateData = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL params
    const { MSISDN, SIM_Number,Operators , Circle,Status } = req.body;

    const updatedData = await datamodel.findByIdAndUpdate(id, {
      MSISDN,
      SIM_Number,
      Operators,
      Circle,
      Status
    }, { new: true });

    if (!updatedData) {
      return res.status(404).send('Data not found');
    }

    res.send({ message: 'Data updated successfully!', data: updatedData });
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
export const deleteData = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(req.body,"req")

    const deletedData = await datamodel.deleteMany({ _id: { $in: ids } });

    if (!deletedData || deletedData.deletedCount === 0) {
      return res.status(404).send('Data not found');
    }

    res.send({
      status: 200,
      message: 'Data deleted successfully!',
      deletedData
    });
  } catch (error) {
    res.status(500).send('An error occurred while deleting data.');
  }
};


 export const getSimStatistics = async (req, res) => {
  try {
    const totalSim = await datamodel.countDocuments();

    const totalActive = await datamodel.countDocuments({ Status: 'Active' });
    const totalInactive = await datamodel.countDocuments({ Status: 'Inactive' });

    const operatorStats = await datamodel.aggregate([
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
        $group: {
          _id: '$Circle',
          totalSimByCircle: { $sum: 1 },
          totalActive: { $sum: { $cond: [{ $eq: ['$Status', 'Active'] }, 1, 0] } },
          totalInactive: { $sum: { $cond: [{ $eq: ['$Status', 'Inactive'] }, 1, 0] } }
          
        }
      }
    ]);

    res.send({totalSim, totalActive, totalInactive,circleStats, operatorStats, status: 200, });
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
export const getAllData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const Circle = req.query.Circle; // Get the circle parameter from the query
    const Status = req.query.Status; // Get the status parameter from the query

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query = {}; // Initialize an empty query object

    // If circle parameter is provided, add it to the query
    if (Circle) {
      query.Circle = Circle;
    }

    // If status parameter is provided, add it to the query
    if (Status) {
      query.Status = Status;
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

    res.send({ data: allData, pagination,totalItems  });
  } catch (error) {
    res.status(500).send('An error occurred while fetching data.');
  }
};
