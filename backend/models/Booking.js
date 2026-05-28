import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transport', required: true },
  className: { type: String, required: true },
  travelDate: { type: String, required: true }, // Format: YYYY-MM-DD
  seats: [{ type: String, required: true }],
  passengers: [{
    name: String,
    age: Number,
    gender: String,
    seatNumber: String,
    className: String
  }],
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'failed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

// Ensure that a user doesn't double book same seat on same date
// Using a unique index on the combination of seat, date, and transport could be tricky if multiple passengers are in the same booking document.
// Therefore, we can create a separate "Ticket" or "SeatReservation" model, or enforce uniqueness within the application logic + locks. 
// However, since MongoDB 4.2+ supports unique index on array of objects with certain configurations, we will rely on SeatLock + Transaction for strict safety.

export default mongoose.model('Booking', bookingSchema);
