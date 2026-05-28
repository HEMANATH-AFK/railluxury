import express from 'express';
import { lockBookingSeat, releaseBookingSeat, confirmBooking, getMyBookings, getSeatAvailability, getBookingById, cancelBooking, deleteBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/lock', protect, lockBookingSeat);
router.post('/unlock', protect, releaseBookingSeat);
router.post('/confirm', protect, confirmBooking);
router.get('/mybookings', protect, getMyBookings);
router.post('/cancel/:id', protect, cancelBooking);
router.get('/:id', protect, getBookingById);
router.delete('/:id', protect, deleteBooking);
router.get('/availability/:transportId/:travelDate/:className', getSeatAvailability);

export default router;
