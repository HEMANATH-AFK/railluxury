import mongoose from 'mongoose';

const liveTrackingStateSchema = new mongoose.Schema({
  transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transport', required: true },
  travelDate: { type: String, required: true }, // YYYY-MM-DD
  currentLocation: {
    lat: Number,
    lng: Number
  },
  currentSegment: String, // e.g., "Near Villupuram"
  distanceRemainingKm: Number,
  progressPercentage: { type: Number, default: 0 }, // 0 to 100
  lastStationPassed: String,
  nextStation: String,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('LiveTrackingState', liveTrackingStateSchema);
