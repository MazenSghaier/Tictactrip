import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import justifyRoutes from './routes/justify';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Attach routes
app.use('/api/auth', authRoutes); // For authentication
app.use('/api', justifyRoutes);   // For text justification

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});