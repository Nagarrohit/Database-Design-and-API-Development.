import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import authRoutes from './routes/auth.js';
import organizationRoutes from './routes/organization.js';
import taskRoutes from'./routes/task.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/organization', organizationRoutes);
app.use('/task', taskRoutes);

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);});
Connection(username,password);
