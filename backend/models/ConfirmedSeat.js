import mongoose from 'mongoose';

const confirmedSeatSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transport', required: true },
  travelDate: { type: String, required: true }, // Format: YYYY-MM-DD
  className: { type: String, required: true },
  seatNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Compound unique index ensures no double booking for same seat in the same class
confirmedSeatSchema.index({ transportId: 1, travelDate: 1, className: 1, seatNumber: 1 }, { unique: true });

export default mongoose.model('ConfirmedSeat', confirmedSeatSchema);
