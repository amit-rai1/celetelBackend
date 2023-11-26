import mongoose from 'mongoose';

const { Schema } = mongoose;

const PermissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  editableFields: [{ type: String }],
});

const PermissionModel = mongoose.model('Permission', PermissionSchema);

export default PermissionModel;
