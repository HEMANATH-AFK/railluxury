import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema({
  type: { type: String, enum: ['train', 'flight'], required: true },
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  route: [{
    station: { type: String, required: true },
    arrivalTime: Date,
    departureTime: Date,
    distanceFromSourceKm: Number
  }],
  classes: [{
    className: { type: String, required: true }, // 'SL', '3A', '2A', '1A', 'CC', 'Economy', 'Business'
    basePrice: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    layout: { type: String, default: '3x3' } // e.g., '2x2', '3x3', 'sleeper'
  }],
  status: { type: String, enum: ['on-time', 'delayed', 'departed', 'arrived'], default: 'on-time' },
  durationMinutes: Number
}, { timestamps: true });

// Virtuals for quick source/destination access
transportSchema.virtual('source').get(function() {
  return this.route[0]?.station;
});

transportSchema.virtual('destination').get(function() {
  return this.route[this.route.length - 1]?.station;
});

export default mongoose.model('Transport', transportSchema);
