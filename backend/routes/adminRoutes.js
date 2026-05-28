import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  getAllBookings, 
  getAllPayments,
  updateTransportStatus,
  resetTracking,
  broadcastNotification,
  getSystemSettings,
  updateSystemSettings
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.get('/bookings', protect, admin, getAllBookings);
router.get('/payments', protect, admin, getAllPayments);
router.patch('/transport/:id/status', protect, admin, updateTransportStatus);

router.post('/tracking/reset', protect, admin, resetTracking);
router.post('/notifications/broadcast', protect, admin, broadcastNotification);
router.get('/settings', protect, admin, getSystemSettings);
router.post('/settings', protect, admin, updateSystemSettings);

export default router;
