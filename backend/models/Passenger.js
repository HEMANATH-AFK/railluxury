import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  preferences: {
    seatPreference: { type: String, default: 'none' } // window, aisle, etc.
  }
}, { timestamps: true });

// Prevent duplicate passengers for the same user
passengerSchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.model('Passenger', passengerSchema);
