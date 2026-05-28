import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import ConfirmedSeat from '../models/ConfirmedSeat.js';
import Transport from '../models/Transport.js';
import SeatLock from '../models/SeatLock.js';
import { lockSeats, releaseSeatLocks, getUnavailableSeats } from '../services/seatLockService.js';
import { sendBookingConfirmationEmail } from '../services/emailService.js';
import { getIO } from '../services/socketService.js';

export const lockBookingSeat = async (req, res) => {
  console.log("Incoming Lock Request:", req.body);
  const { transportId, travelDate, className, seats } = req.body;

  if (!mongoose.Types.ObjectId.isValid(transportId)) {
    return res.status(400).json({ message: 'Invalid Transport ID' });
  }

  if (!Array.isArray(seats) || seats.length === 0 || !className) {
    return res.status(400).json({ message: 'Seats and Class Name are required' });
  }
  
  try {
    const success = await lockSeats(transportId, travelDate, className, seats, req.user._id);
    if (success) {
      res.json({ message: 'Seats locked successfully', seats });
    }
  } catch (error) {
    console.error("🔥 LOCK ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};

export const releaseBookingSeat = async (req, res) => {
  const { transportId, travelDate, className, seats } = req.body;
  try {
    await releaseSeatLocks(transportId, travelDate, className, seats, req.user._id);
    res.json({ message: 'Seats unlocked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSeatAvailability = async (req, res) => {
  const { transportId, travelDate, className } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(transportId)) {
    return res.status(400).json({ message: 'Invalid Transport ID' });
  }

  try {
    const unavailableSeats = await getUnavailableSeats(transportId, travelDate, className);
    res.json({ unavailableSeats });
  } catch (error) {
    console.error("🔥 AVAILABILITY ERROR:", error);
    res.status(500).json({ message: "Failed to fetch seat availability", error: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  console.log("Incoming Confirm Request:", req.body);
  const { userId, transportId, travelDate, className, seats, passengers } = req.body;

  if (!userId || !transportId || !travelDate || !className || !Array.isArray(seats) || !Array.isArray(passengers)) {
    return res.status(400).json({ message: "Invalid booking data: Missing required fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(transportId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID or Transport ID format" });
  }

  try {
    const transport = await Transport.findById(transportId);
    if (!transport) return res.status(404).json({ message: 'Transport not found' });

    const selectedClass = transport.classes.find(c => c.className === className);
    if (!selectedClass) return res.status(400).json({ message: 'Selected class not found on this transport' });

    const now = new Date();

    const locks = await SeatLock.find({ transportId, travelDate, className, seatNumber: { $in: seats } });
    if (locks.length !== seats.length) {
      return res.status(400).json({ message: 'One or more seat locks are missing or invalid.' });
    }
    
    for (const lock of locks) {
      if (lock.lockedBy.toString() !== userId.toString() || lock.expiresAt < now) {
        return res.status(409).json({ message: `Lock for seat ${lock.seatNumber} has expired or belongs to another user.` });
      }
    }

    const isConfirmed = await ConfirmedSeat.findOne({ transportId, travelDate, className, seatNumber: { $in: seats } });
    if (isConfirmed) return res.status(409).json({ message: 'One or more seats are already booked.' });

    const calculatedTotal = selectedClass.basePrice * seats.length;

    const booking = new Booking({
      userId,
      transportId,
      className,
      travelDate,
      seats,
      passengers,
      totalAmount: calculatedTotal,
      status: 'pending',
      paymentStatus: 'pending'
    });
    const createdBooking = await booking.save();

    // Note: We DO NOT confirm seats or send email here anymore.
    // That happens AFTER payment verification.

    res.status(201).json(createdBooking);
  } catch (error) {
    console.error("🔥 CONFIRM ERROR:", error);
    res.status(500).json({ message: "Internal server error during confirmation", error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('transportId')
      .populate('userId', 'name email');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Security: Only owner can see their booking
    if (booking.userId._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('transportId');
    res.json(bookings);
  } catch (error) {
    console.error("🔥 MY BOOKINGS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📡 Cancel request received for ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Booking ID format" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify ownership
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to cancel this booking" });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    // Update status
    booking.status = "cancelled";
    await booking.save();

    // Release confirmed seats
    await ConfirmedSeat.deleteMany({ bookingId: booking._id });

    // Emit socket event to update seat map
    const roomId = `${booking.transportId}_${booking.travelDate}_${booking.className}`;
    getIO().to(roomId).emit('seat_released', { seats: booking.seats });

    res.json({ message: "Booking cancelled successfully" });

  } catch (error) {
    console.error("🔥 CANCEL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑️ Delete request received for ID:", id);

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify ownership
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this booking" });
    }

    // Clean up confirmed seats before deleting
    await ConfirmedSeat.deleteMany({ bookingId: booking._id });
    
    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking deleted successfully" });

  } catch (error) {
    console.error("🔥 DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
