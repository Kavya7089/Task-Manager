import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import { authenticateToken } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); // This line is required

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    await sequelize.sync({ force: false });
    console.log('Database synchronized.');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();