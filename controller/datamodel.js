
 import datamodel from '../model/datamodel'
 
 export const addData = async (req, res) => {
  try {
    const { MSISDN, SIM_Number, IMSI_Number, Circle, Status } = req.body; // Added Status
    const newData = new datamodel({ MSISDN, SIM_Number, Circle, Status }); // Added Status
    const data = await newData.save();
    res.send({ message: 'Data added successfully!', data });
  } catch (error) {
    res.status(500).send('An error occurred while adding data.');
  }
};


  export const getAllData = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters, default to 10 if not provided
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const totalItems = await datamodel.countDocuments();
  
      const allData = await datamodel.find().skip(startIndex).limit(limit);
  
      // Pagination result
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
      const { MSISDN, SIM_Number, IMSI_Number, Circle } = req.body;
      
      const updatedData = await datamodel.findByIdAndUpdate(id, {
        MSISDN,
        SIM_Number,
        IMSI_Number,
        Circle,
      }, { new: true });
  
      if (!updatedData) {
        return res.status(404).send('Data not found');
      }
  
      res.send({ message: 'Data updated successfully!', data: updatedData });
    } catch (error) {
      res.status(500).send('An error occurred while updating data.');
    }
  };
  

  export const deleteData = async (req, res) => {
    try {
      const { ids } = req.body; // Assuming you're sending an array of IDs in the request body
  
      const deletedData = await datamodel.deleteMany({ _id: { $in: ids } });
  
      if (!deletedData) {
        return res.status(404).send('Data not found');
      }
  
      res.send({ message: 'Data deleted successfully!', deletedData });
    } catch (error) {
      res.status(500).send('An error occurred while deleting data.');
    }
  };
  