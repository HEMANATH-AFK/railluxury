import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  paymentMethod: { type: String, required: true }, // 'UPI', 'CARD', 'NETBANKING'
  transactionId: { type: String, unique: true },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
