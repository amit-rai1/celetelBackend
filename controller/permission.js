import PermissionModel from "../model/permission";
import userModel from "../model/userModel";

// This endpoint allows the admin to set permissions for a specific user
// export const setPermissions = async (req, res) => {
//     try {
//       const { userId, editableFields } = req.body; // Get user ID and editable fields
//       // Check if the user exists
//       const user = await userModel.findById(userId);
  
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
  
//       // Create or update permissions for the user
//       let permission = await PermissionModel.findOne({ userId });
  
//       if (!permission) {
//         permission = new PermissionModel({ userId, editableFields });
//       } else {
//         permission.editableFields = editableFields;
//       }
  
//       await permission.save();
  
//       res.send({
//         status: 200,
//         message: 'Permissions updated successfully!',
//         permission,
//       });
//     } catch (error) {
//       res.status(500).send('An error occurred while setting permissions.');
//     }
//   };

export const setPermissions = async (req, res) => {
  try {
      const { userId, editableFields } = req.body; // Get user ID and editable fields
      
      // Check if the user exists
      const user = await userModel.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      // Find the existing permissions for the user
      let permission = await PermissionModel.findOne({ userId });

      if (!permission) {
          // If no permission exists, create a new entry
          permission = new PermissionModel({ userId, editableFields });
      } else {
          // Update the permission by merging the new fields with the existing ones
          const updatedFields = [...new Set([...permission.editableFields, ...editableFields])]; // Merge and remove duplicates
          permission.editableFields = updatedFields;
      }

      await permission.save();

      res.send({
          status: 200,
          message: 'Permissions updated successfully!',
          permission,
      });
  } catch (error) {
      res.status(500).send('An error occurred while setting permissions.');
  }
};

  


  export const getUserPermissions = async (req, res) => {
    try {
      const { userId } = req.params; // Get the user ID from request parameters
  
      // Find permissions for the given user ID
      const userPermissions = await PermissionModel.findOne({ userId });
  
      if (!userPermissions) {
        return res.status(404).send('Permissions not found for this user');
      }
  
      res.send({
        status: 200,
        message: 'User permissions retrieved successfully!',
        permissions: userPermissions.editableFields, // Assuming 'editableFields' holds the permissions
      });
    } catch (error) {
      res.status(500).send('An error occurred while fetching user permissions.');
    }
  };