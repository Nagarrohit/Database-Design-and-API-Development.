import express from 'express';
import { createOrganization } from '../controllers/organizationController.js';
import { addUserToOrganization } from '../controllers/organizationController.js';

const router = express.Router();
router.post('/create', createOrganization);
router.get('/', addUserToOrganization);
export default router;