import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { initializeSocket } from './services/socketService.js';

import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import transportRoutes from './routes/transportRoutes.js';
import passengerRoutes from './routes/passengerRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { startCronJobs } from './utils/cronJobs.js';
import { startTrackingSimulator } from './services/trackingService.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticket-reservation';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();
startCronJobs();
startTrackingSimulator();

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\x1b[31mPort ${PORT} is already in use.\x1b[0m`);
    console.error(`Try running: \x1b[36mnpx kill-port ${PORT}\x1b[0m or kill the process manually.`);
    process.exit(1);
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
