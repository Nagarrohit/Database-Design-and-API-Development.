import Organization from '../models/organization.js';
import User from '../models/user.js';
export const createOrganization = async (req, res) => {
  try {
    const { name} = req.body;
    const {users} = req.body;
    const existingOrganization = await Organization.findOne({ name });
    // console.log(name, "rrrrrrr")
    if (existingOrganization) {
      return res.status(400).json({ message: 'Organization name already exists' });
    }
    const organization = await Organization.create({ name });

    if (users && users.length > 0) {
      console.log(users,"usertest")
      await User.updateMany({ _id: { $in: users } }, { $set: { organization: organization._id } });
    }

    res.status(201).json({ organization });
  } catch (error) {
    console.error('Error in creating organization:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addUserToOrganization = async (req, res) => {
  try {
    const { organizationId, userId } = req.body;
    const organization = await Organization.findById(organizationId);
    console.log(userId,"rrrrrr")
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    organization.users.push(userId);
    await organization.save();

    res.status(200).json({ message: 'User added to organization successfully' });
  } catch (error) {
    console.error('Error in adding user to organization:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
