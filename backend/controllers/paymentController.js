import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import ConfirmedSeat from '../models/ConfirmedSeat.js';
import SeatLock from '../models/SeatLock.js';
import Transport from '../models/Transport.js';
import { getIO } from '../services/socketService.js';
import { sendBookingConfirmationEmail } from '../services/emailService.js';

export const createPaymentSession = async (req, res) => {
  const { bookingId, paymentMethod } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Simulated payment session creation
    const payment = new Payment({
      userId: req.user._id,
      bookingId,
      amount: booking.totalAmount,
      paymentMethod,
      transactionId: 'TXN_' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
      status: 'pending'
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  console.log("Incoming Payment Verify Request:", req.body);
  const { transactionId, status } = req.body; // status: 'success' or 'failed'
  
  try {
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      console.warn(`⚠️ PAYMENT VERIFY: Transaction ${transactionId} not found`);
      return res.status(404).json({ message: 'Payment record not found' });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ message: 'Payment has already been processed' });
    }

    const booking = await Booking.findById(payment.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Associated booking not found' });
    }

    if (status === 'success') {
      // 1. Update Payment Status
      payment.status = 'success';
      await payment.save();

      // 2. Update Booking Status
      booking.status = 'confirmed';
      booking.paymentStatus = 'paid';
      await booking.save();

      // 3. Finalize Seats in ConfirmedSeat Collection
      const confirmedSeats = booking.seats.map(seatNumber => ({
        bookingId: booking._id,
        transportId: booking.transportId,
        travelDate: booking.travelDate,
        className: booking.className,
        seatNumber,
        userId: booking.userId
      }));

      try {
        await ConfirmedSeat.insertMany(confirmedSeats, { ordered: true });
      } catch (insertError) {
        console.error("🔥 CONFIRMED SEAT INSERT ERROR:", insertError);
        // This usually means a race condition where the seat was booked by another user
        return res.status(409).json({ message: 'One or more seats were already confirmed by another transaction.' });
      }
      
      // 4. Release Temporary Locks
      await SeatLock.deleteMany({ 
        transportId: booking.transportId, 
        travelDate: booking.travelDate, 
        className: booking.className, 
        seatNumber: { $in: booking.seats } 
      });

      // 5. Broadcast to real-time seat map
      const roomId = `${booking.transportId}_${booking.travelDate}_${booking.className}`;
      getIO().to(roomId).emit('seat_booked', { seats: booking.seats });

      // 6. Dispatch Digital Ticket (Email)
      const transport = await Transport.findById(booking.transportId);
      if (req.user?.email) {
        sendBookingConfirmationEmail(req.user.email, {
          passengerName: booking.passengers?.map(p => p.name).join(', ') || 'Valued Passenger',
          source: transport?.source || 'N/A',
          destination: transport?.destination || 'N/A',
          travelDate: booking.travelDate,
          seatNumber: booking.seats.join(', '),
          ticketId: booking._id,
          status: 'Confirmed',
          transportName: transport?.name || 'N/A',
          transportNumber: transport?.number || 'N/A',
          travelClass: booking.className,
          totalAmount: booking.totalAmount
        });
      }

      res.json({ message: 'Payment verified and booking confirmed', bookingId: booking._id });
    } else {
      // Payment Failed logic
      payment.status = 'failed';
      await payment.save();
      
      booking.status = 'failed';
      booking.paymentStatus = 'failed';
      await booking.save();

      res.json({ message: 'Payment status marked as failed' });
    }
  } catch (error) {
    console.error("🔥 PAYMENT VERIFY SYSTEM ERROR:", error);
    res.status(500).json({ message: "Internal server error during payment verification", error: error.message });
  }
};
