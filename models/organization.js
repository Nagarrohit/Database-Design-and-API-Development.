import mongoose from 'mongoose';
const organizationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;