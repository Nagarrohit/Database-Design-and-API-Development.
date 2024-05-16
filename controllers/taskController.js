import Task from '../models/task.js';
import Organization from '../models/organization.js';
export const createTask = async (req, res) => {
  try {
    const { organizationId } = req.body;
    
    if (!organizationId) {
      return res.status(400).json({ message: 'Organization ID is required' });
    }
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    const taskDetails = { organization: organizationId,};
    const task = await Task.create(taskDetails);
    
    res.status(201).json({ task });
  } catch (error) {
    console.error('Error in creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const tasks = await Task.find({ organization: organizationId });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error in getting tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
