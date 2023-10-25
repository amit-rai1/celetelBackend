import senderid from "../model/senderId";




export const addSenderID = async (req, res) => {
    try {
      const { SenderID } = req.body; // Added Status
      const newData = new senderid({SenderID }); // Added Status
      const data = await newData.save();
      res.send({
        status: 200,
        message: 'Data added successfully!', data
      });
    } catch (error) {
      res.status(500).send('An error occurred while adding data.');
    }
  };
  // export const getSenderId = async (req, res) => {
  //   try {
  //     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
  //     const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters, default to 10 if not provided
  
  //     const startIndex = (page - 1) * limit;
  //     const endIndex = page * limit;
  
  //     const totalItems = await senderid.countDocuments();
  
  //     const allData = await senderid.find().skip(startIndex).limit(limit);
  
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
  

  // export const deleteData = async (req, res) => {
  //   try {
  //     const { ids } = req.body;
  //     console.log(req.body,"req")
  
  //     const deletedData = await senderid.deleteMany({ _id: { $in: ids } });
  
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
  export const getSenderId = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const totalItems = await senderid.countDocuments({ deleted: false }); // Exclude soft-deleted records
  
      const allData = await senderid
        .find({ deleted: false }) // Exclude soft-deleted records
        .skip(startIndex)
        .limit(limit);
  
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
  
      res.send({ data: allData, pagination });
    } catch (error) {
      res.status(500).send('An error occurred while fetching data.');
    }
  };

  export const deleteData = async (req, res) => {
    try {
      const { ids, deletedBy } = req.body; // Added deletedBy
  
      const deletedData = await senderid.updateMany(
        { _id: { $in: ids } },
        {
          $set: {
            deleted: true,
            deletedBy: deletedBy,
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
        deletedData
      });
    } catch (error) {
      res.status(500).send('An error occurred while deleting data.');
    }
  };