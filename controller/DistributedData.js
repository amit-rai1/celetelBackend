import DistributedData from "../model/DistributedData";

export const getDistributedDataInfo = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the ID as a URL parameter
    const dataInfo = await DistributedData.findById(id); // Find data by ID

    if (!dataInfo) {
      return res.status(404).json({ success: false, msg: "Data not found" });
    }

    const usedData = dataInfo.usedData;
    const unusedData = dataInfo.unusedData;

    res.status(200).json({
      success: true,
      msg: "Data information retrieved successfully",
      usedData,
      unusedData,
      dataInfo
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error.message });
  }
};



