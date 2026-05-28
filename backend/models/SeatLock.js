import mongoose from 'mongoose';

const seatLockSchema = new mongoose.Schema({
  transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transport', required: true },
  travelDate: { type: String, required: true }, // Format: YYYY-MM-DD
  className: { type: String, required: true },
  seatNumber: { type: String, required: true },
  lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true }
});

// TTL Index: Lock expires exactly at 'expiresAt' timestamp
seatLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound unique index to prevent multiple users from locking the same seat in the same class simultaneously
seatLockSchema.index({ transportId: 1, travelDate: 1, className: 1, seatNumber: 1 }, { unique: true });

export default mongoose.model('SeatLock', seatLockSchema);
